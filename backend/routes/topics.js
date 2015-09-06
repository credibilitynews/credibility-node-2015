var jsonGraph = require('falcor-json-graph');
var $ref = jsonGraph.ref;
var $error = jsonGraph.error;

var topicService = require('../services/topic-service');

module.exports = [
    {
        route: "topicsById[{integers:topicIds}]['id','title','hashtag','created_at','views','user_id']",
        get: function(pathSet) {
            var userId = this.userId;
            console.log('topicsById/pathSet', pathSet);

            return topicService
                .getTopics(pathSet.topicIds)
                .then(function(topics) {
                    var results = [];
                    //console.log('topicsById/then', topics);
                    pathSet.topicIds.forEach(function(topicId) {
                        var topicRecord = topics[topicId] || {};
                        //console.log('topicsById/pathSet[2]', pathSet[2]);
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
                    //console.log('results', results);
                    return results;
                }).catch(function(why){console.log(why)});
        }
    },
    {
        route: "latestTopics[{integers:n}]['id']",
        get: function(pathSet, args) {
            var userId = this.userId;
            var limit = pathSet.n.slice(-1)[0] - pathSet.n[0] + 1;
            var offset = pathSet.n[0];

            return topicService
                .getLatestTopics(offset, limit)
                .then(function(topics) {

                    var results = [];
                    var topicIds = Object.keys(topics);
                    pathSet.n.forEach(function(n, index) {

                        var id = topicIds[index];
                        var topicRecord = topics[id];
                        var value = !topicRecord ? null : $ref(['topicsById', topicRecord.id]);

                        results.push({
                            path: ['latestTopics', n, 'id'],
                            value: value
                        });
                    });
                    return results;
                }).catch(function(why){console.log(why)});
        }
    }
];
