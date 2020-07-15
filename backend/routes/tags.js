const jsonGraph = require("falcor-json-graph");
var $ref = jsonGraph.ref;
var $error = jsonGraph.error;

const tagService = require("../services/tag-service");

module.exports = [
  {
    route: "tagsById[{integers:tagIds}]['id', 'name', 'code', 'parent_id']",
    get: function (pathSet) {
      return tagService
        .getTags(pathSet.tagIds)
        .then(function (tags) {
          var results = [];
          pathSet.tagIds.forEach(function (tagId) {
            var tagRecord = tags[tagId];
            pathSet[2].forEach(function (key) {
              var value = tagRecord ? tagRecord[key] : undefined;

              switch (key) {
                case parent_id:
                  value = value ? $ref(["tagsById", value]) : value;
                  break;
                default:
                  value = value;
                  break;
              }
              results.push({
                path: ["tagsById", tagId, key],
                value: value,
              });
            });
          });
          return results;
        })
        .catch(function (why) {
          process.stdout.write("catch#tagsById" + why + why.stack);
        });
    },
  },
  {
    route:
      "tags[{integers:n}]['id', 'name', 'code', 'parent_id', 'topic_count']",
    get: function (pathSet) {
      return tagService
        .getAllTags()
        .then(function (tags) {
          var results = [];
          Object.keys(tags).forEach(function (tagId, index) {
            var tagRecord = tags[tagId] || {};
            pathSet[2].forEach(function (key) {
              var value = tagRecord[key];
              if (value === null) value = undefined;
              if (typeof value === "object") value = value.toString();

              results.push({
                path: ["tags", index, key],
                value: value,
              });
            });
          });
          return results;
        })
        .catch(function (why) {
          process.stdout.write("catch#tags" + why + why.stack);
        });
    },
  },
  {
    route: "topTags[{integers:n}]['id', 'name', 'code', 'parent_id']",
    get: function (pathSet) {
      return tagService
        .getTopTags()
        .then(function (tags) {
          var results = [];
          Object.keys(tags).forEach(function (tagId, index) {
            var tagRecord = tags[tagId] || {};
            pathSet[2].forEach(function (key) {
              var value = tagRecord[key];
              if (value === null) value = undefined;
              if (typeof value === "object") value = value.toString();

              results.push({
                path: ["topTags", index, key],
                value: value,
              });
            });
          });
          return results;
        })
        .catch(function (why) {
          process.stdout.write("catch#topTags" + why + why.stack);
        });
    },
  },
  {
    route: "tags.length",
    get: function (pathSet) {
      return tagService
        .getTagsCount()
        .then(function (length) {
          return {
            path: ["tags", "length"],
            value: length,
          };
        })
        .catch(function (why) {
          process.stdout.write("catch#tags.length" + why + why.stack);
        });
    },
  },
];
