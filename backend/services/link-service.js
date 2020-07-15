const Sequelize = require("sequelize");
const { model: Topics } = require("./topic-service");
const { model: Users } = require("./user-service");
const AYLIENTextAPI = require("aylien_textapi");
var textapi = new AYLIENTextAPI({
  application_id: process.env.AYLIEN_API_ID,
  application_key: process.env.AYLIEN_API_KEY,
});

var sequelize = new Sequelize(process.env.DATABASE_URL, { native: true });
var Links = sequelize.define(
  "links",
  {
    title: {
      type: Sequelize.STRING,
      unique: true,
      notNull: true,
    },
    url: {
      type: Sequelize.STRING,
      unique: true,
      notNull: true,
    },
    user_id: {
      type: Sequelize.INTEGER,
      references: {
        model: Users,
        key: "id",
        deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE,
      },
    },
    topic_id: {
      type: Sequelize.INTEGER,
      references: {
        model: Topics,
        key: "id",
        deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE,
      },
    },
    bias: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
    active: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    },
    created_at: Sequelize.DATE,
    updated_at: Sequelize.DATE,
  },
  {
    createdAt: "created_at",
    updatedAt: "updated_at",
    validate: {
      custom: function () {
        var labels = {
          topic_id: "Article Topic",
          user_id: "User",
          title: "Article Title",
          url: "Article URL",
        };
        ["url", "title", "topic_id", "user_id"].forEach((field) => {
          if (
            !this[field] ||
            (typeof this[field] === "string" && this[field].length == 0)
          )
            throw new Error(labels[field] + " cannot be empty");
        });
      },
    },
  }
);

Links.belongsTo(Topics, { foreignKey: "topic_id" });
Links.belongsTo(Users, { foreignKey: "user_id" });

const batch = require("./batch");
const path = require("path");
const Promise = require("promise");
const request = require("superagent");

function LinkService() {}
LinkService.prototype = {
  getLinks(linkIds) {
    return new Promise(function (resolve, reject) {
      Links.findAll({
        include: [Topics, Users],
        where: {
          id: {
            $in: linkIds,
          },
        },
      })
        .then(function (result) {
          var values = result.reduce(function (reduced, row) {
            row = row.dataValues;
            reduced[row.id] = row;
            reduced[row.id]["topic_title"] = row.topic.title;
            reduced[row.id]["user_name"] = row.user.name || "anonymous";
            return reduced;
          }, {});
          resolve(values);
        })
        .catch(function (why) {
          console.log("caught:", why);
          reject(why);
        });
    });
  },
  getLatestLinks(offset, limit) {
    return new Promise(function (resolve, reject) {
      Links.findAll({
        include: [Topics, Users],
        where: {
          active: true,
        },
        order: [["created_at", "desc"]],
        limit: limit,
        offset: offset,
      })
        .then(function (result) {
          var values = result.reduce(function (reduced, row) {
            row = row.dataValues;
            reduced[row.id] = row;
            reduced[row.id]["topic_title"] = row.topic.title;
            reduced[row.id]["user_name"] = row.user.name || "anonymous";
            return reduced;
          }, {});
          //console.log(values);
          resolve(values);
        })
        .catch(function (why) {
          console.log("caught:", why);
          reject(why);
        });
    });
  },
  getTaggedLinks(offset, limit, tagId) {
    return new Promise(function (resolve, reject) {
      sequelize
        .query(
          `Select links.*, tags.name as tag_name, topics.title as topic_title, users.name as user_name from links
                join topic_tags on topic_tags.tag_id = ? and topic_tags.topic_id = links.topic_id
                left join tags on topic_tags.tag_id = tags.id
                left join topics on links.topic_id = topics.id
                left join users on links.user_id = users.id
                order by links.created_at desc;`,
          { type: sequelize.QueryTypes.SELECT, replacements: [tagId] }
        )
        .then(function (result) {
          console.log(result);
          var values = result.reduce(function (reduced, row) {
            reduced[row.id] = row;
            reduced[row.id]["topic_title"] = row.topic_title;
            reduced[row.id]["user_name"] = row.user_name || "anonymous";
            reduced[row.id]["tag_name"] = row.tag_name;
            return reduced;
          }, {});
          //console.log(values);
          resolve(values);
        })
        .catch(function (why) {
          console.log("caught:", why);
          reject(why);
        });
    });
  },
  getLinksByTopicId(offset, limit, topicId) {
    return new Promise(function (resolve, reject) {
      Links;
      sequelize
        .query(
          `Select links.*, topics.title as topic_title, users.name as user_name from links
                join topics on links.topic_id = ?
                left join users on links.user_id = users.id
                order by links.created_at desc;`,
          { type: sequelize.QueryTypes.SELECT, replacements: [topicId] }
        )
        .then(function (result) {
          console.log(result);
          var values = result.reduce(function (reduced, row) {
            reduced[row.id] = row;
            reduced[row.id]["topic_title"] = row.topic_title;
            reduced[row.id]["user_name"] = row.user_name || "anonymous";
            reduced[row.id]["tag_name"] = row.tag_name;
            return reduced;
          }, {});
          //console.log(values);
          resolve(values);
        })
        .catch(function (why) {
          console.log("caught:", why);
          reject(why);
        });
    });
  },
  fetchUrlMeta(url) {
    return new Promise((resolve, reject) => {
      var title = null;
      var topics = [];
      textapi.combined(
        {
          url: url,
          best_image: true,
          endpoint: ["extract", "hashtags", "sentiment"],
          taxonomy: "iab-qag",
        },
        (err, res) => {
          console.log(err, res);
          if (err) return reject(err);

          var results = {};
          res.results.forEach(function (r) {
            results[r.endpoint] = r.result;
          });
          console.log(results);
          resolve(results);
        }
      );
    });
  },
  postNewLink(data, userId) {
    return new Promise((resolve, reject) => {
      let createTopicLink = (topic_id) => {
        Links.create({
          topic_id: topic_id,
          url: data.url,
          title: data.title,
          user_id: userId,
          image_url: data.image_url,
          text_summary: data.text_summary,
          hashtags: data.hashtags,
        })
          .then((link) => {
            resolve({ id: link.id });
          })
          .catch((why) => {
            console.log("catch#postNewLink", why, why.stack);
            resolve({ errors: errorsToMessage(why) });
          });
      };
      if (data.topic && data.topic.length > 0) {
        Topics.create({
          title: data.topic,
          user_id: userId,
          hashtags: data.hashtags,
        })
          .then((topic) => {
            createTopicLink(topic.id);
          })
          .catch((why) => {
            console.log("catch#createTopic", why, why.stack);
            resolve({ errors: errorsToMessage(why) });
          });
      } else {
        createTopicLink(data.topic_id);
      }
    });
  },
};

function errorsToMessage(why) {
  return why.message + ": " + why.errors.map((e) => e.message).join(", ");
}

const instance = new LinkService();
instance.model = Links;
module.exports = instance;
