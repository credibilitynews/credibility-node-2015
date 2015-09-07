var jsonGraph = require('falcor-json-graph');
var $ref = jsonGraph.ref;
var $error = jsonGraph.error;

var tagService = require('../services/tag-service');

module.exports = [
    {
        route: "tagsById[{integers:tagIds}]['id', 'name', 'code', 'parent_id']",
        get: function(pathSet) {
            var userId = this.userId;

            return tagService
                .getTags(pathSet.tagIds)
                .then(function(tags) {
                    var results = [];
                    //console.log('pathSet', pathSet);
                    pathSet.tagIds.forEach(function(tagId) {
                        var tagRecord = tags[tagId];
                        pathSet[2].forEach(function(key) {
                            var value = tagRecord ? tagRecord[key] : undefined;

                            switch(key){
                                case "parent_id": value = value ? $ref(['tagsById', value]) : value; break;
                                default: value = value; break;
                            }
                            results.push({
                                path: ['tagsById', tagId, key],
                                value: value
                            });
                        });

                    });
                    return results;
                }).catch(function(why){console.log(why)});
        }
    },
    {
        route: "tags[{integers:n}]['id', 'name', 'code', 'parent_id']",
        get: function(pathSet) {
            var userId = this.userId;

            return tagService
                .getAllTags()
                .then(function(tags) {
                    var results = [];
                    console.log('tags', tags);
                    Object.keys(tags).forEach(function(tagId, index) {
                        var tagRecord = tags[tagId];

                        results.push({
                            path: ['tags', index, 'id'],
                            value: $ref(["tagsById", tagId])
                        });
                    });
                    console.log('results', results);
                    return results;
                }).catch(function(why){console.log(why)});
        }
    },
    {
        route: "tags.length",
        get: function(pathSet) {
            var userId = this.userId;

            return tagService
                .getTagsCount()
                .then(function(length) {
                    console.log('length', length);
                    return {
                        path: ['tags', 'length'],
                        value: length
                    };
                }).catch(function(why){console.log(why)});
        }
    }
];
