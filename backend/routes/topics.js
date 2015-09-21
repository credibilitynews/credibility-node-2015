var jsonGraph = require('falcor-json-graph');
var $ref = jsonGraph.ref;
var $error = jsonGraph.error;

var topicService = require('../services/topic-service');

module.exports = [
    {
        route: "topicsById[{integers:topicIds}]['id','title','hashtag','created_at','views','user_id']",
        get: function(pathSet) {
            

            return topicService
                .getTopics(pathSet.topicIds)
                .then(function(topics) {
                    var results = [];
                    pathSet.topicIds.forEach(function(topicId) {
                        var topicRecord = topics[topicId] || {};
                        pathSet[2].forEach(function(key) {
                            var value = topicRecord[key];
                            if(value === null) value = undefined;
                            if(typeof value === "object"){
                                value = value.toString();
                                //throw new Error('Invalid value of '+key)
                            };
                            results.push({
                                path: ['topicsById', topicId, key],
                                value: value
                            });
                        });

                    });
                    return results;
                }).catch(function(why){console.log('topicsById/error', why)});
        }
    },
    {
        route: "latestTopics[{integers:n}]['id','title','hashtag','created_at','views','user_id']",
        get: function(pathSet) {
            
            var limit = pathSet.n.slice(-1)[0] - pathSet.n[0] + 1;
            var offset = pathSet.n[0];

            return topicService
                .getLatestTopics(offset, limit)
                .then(function(topics) {
                    var results = [];

                    var topicIds = Object.keys(topics);
                    pathSet.n.forEach(function(n, index) {
                        var id = topicIds[index];
                        var topicRecord = topics[id] || {};

                        pathSet[2].forEach(function(key){
                            var value = topicRecord[key];
                            if(value === null) value = undefined;
                            if(typeof value === "object") value = value.toString();
                            results.push({
                                path: ['latestTopics', n, key],
                                value: value
                            });
                        })
                    });
                    return results;
                }).catch(function(why){console.log('latestTopics/error', why)});
        }
    }
];
