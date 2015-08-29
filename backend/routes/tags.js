var jsonGraph = require('falcor-json-graph');
var $ref = jsonGraph.ref;
var $error = jsonGraph.error;

var tagService = require('../services/tag-service');

module.exports = [
    {
        route: "tagsById[{integers:tagIds}]['name', 'code']",
        get: function(pathSet) {
            var userId = this.userId;

            return tagService
                .getTags(pathSet.tagIds)
                .then(function(tags) {
                    
                    var results = [];
                    console.log('pathSet', pathSet);
                    pathSet.tagIds.forEach(function(tagId) {
                        var tagRecord = tags[tagId];
                        pathSet[2].forEach(function(key) {
                            var value = tagRecord ? tagRecord[key] : undefined;
                            results.push({
                                path: ['tagsById', tagId, key],
                                value: value
                            });
                        });

                    });
                    return results;
                }).catch(function(why){console.log(why)});
        }
    }
];
