const Sequelize = require("sequelize");
const { model: Topics } = require("./topic-service");

const sequelize = new Sequelize(process.env.DATABASE_URL, { native: true });
const Tags = sequelize.define(
  "tags",
  {
    name: Sequelize.STRING,
    code: Sequelize.STRING,
    parent_id: Sequelize.INTEGER,
  },
  {
    timestamps: false,
  }
);

const TopicTags = sequelize.define("topic_tags", {
  tag_id: Sequelize.INTEGER,
  topic_id: Sequelize.INTEGER,
});
TopicTags.belongsTo(Tags, { foreignKey: "tag_id" });
Topics.belongsToMany(Tags, {
  through: {
    model: TopicTags,
  },
  foreignKey: "topic_id",
});
Tags.belongsToMany(Topics, {
  through: {
    model: TopicTags,
  },
  foreignKey: "tag_id",
});

const batch = require("./batch");
const path = require("path");
const Promise = require("promise");

function TagService() {}
TagService.prototype = {
  getTags: function (tagIds) {
    return new Promise(function (resolve, reject) {
      Tags.findAll({
        where: {
          id: {
            $in: tagIds,
          },
        },
      })
        .then(function (result) {
          var values = result.reduce(function (reduced, row) {
            row = row.dataValues;
            reduced[row.id] = row;
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
  getAllTags: function () {
    return new Promise(function (resolve, reject) {
      Tags.findAll({
        order: [["name", "asc"]],
      })
        .then(function (result) {
          var values = result.reduce(function (reduced, row) {
            row = row.dataValues;
            reduced[row.id] = row;
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
  getTopTags: function () {
    return new Promise(function (resolve, reject) {
      sequelize
        .query(
          "SELECT count(topic_tags.topic_id) as topic_count, tags.* FROM topic_tags left join tags on topic_tags.tag_id = tags.id where parent_id is not null group by tags.id, tags.name, tags.code, tags.parent_id order by topic_count;",
          { type: sequelize.QueryTypes.SELECT }
        )
        .then(function (result) {
          var values = result.reduce(function (reduced, row) {
            reduced[row.id] = row;
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
  getTagsCount: function () {
    return new Promise(function (resolve, reject) {
      Tags.findAll({})
        .then(function (result) {
          resolve(result.length);
        })
        .catch(function (why) {
          console.log("caught:", why);
          reject(why);
        });
    });
  },
};

const instance = new TagService();
instance.model = Tags;
module.exports = instance;
