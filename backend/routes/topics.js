var jsonGraph = require('falcor-json-graph');
var $ref = jsonGraph.ref;
var $error = jsonGraph.error;

var topicService = require('../services/topic-service');

module.exports = [
    {
        route: "topicsById[{integers:topicIds}]['title', 'hashtag', 'created_at', 'views', 'user_id']",
        get: function(pathSet) {
            var userId = this.userId;

            return topicService
                .getTopics(pathSet.topicIds)
                .then(function(topics) {
                    var results = [];
                    //console.log('pathSet', pathSet);
                    pathSet.topicIds.forEach(function(topicId) {
                        var topicRecord = topics[topicId];
                        pathSet[2].forEach(function(key) {
                            var value = topicRecord ? topicRecord[key] : undefined;

                            switch(key){
                                case "user_id": value = value ? $ref(['usersById', value]) : value; break;
                                default: value = value; break;
                            }
                            results.push({
                                path: ['topicsById', topicId, key],
                                value: value
                            });
                        });

                    });
                    return results;
                }).catch(function(why){console.log(why)});
        }
    },
    {
        route: "latestTopics['title', 'hashtag', 'created_at', 'views', 'user_id']",
        call: function(callPath, args) {
            var userId = this.userId;
            var limit = args[1];
            var offset = args[0];

            return topicService
                .getLatestTopics(offset, limit)
                .then(function(topics) {
                    var results = [];
                    Object.keys(topics).forEach(function(topicId) {
                        var topicRecord = topics[topicId];
                        callPath[1].forEach(function(key) {
                            var value = topicRecord[key];
                            switch(key){
                                case "user_id": value = $ref(['usersById', value]); break;
                                default: value = topicRecord[key]; break;
                            }
                            results.push({
                                path: ['latestTopics', topicId, key],
                                value: value
                            });
                        });

                    });
                    return results;
                }).catch(function(why){console.log(why)});
        }
    }
];
