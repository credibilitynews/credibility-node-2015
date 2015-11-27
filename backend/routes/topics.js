import jsonGraph from 'falcor-json-graph';
var $ref = jsonGraph.ref;
var $error = jsonGraph.error;

import topicService from '../services/topic-service';

function pushTopics(routeName, ids, keys){

    return function(topics) {
        var results = [];
        ids.forEach(function(topicId) {
            var topicRecord = topics[topicId] || {};
            keys.forEach(function(key) {
                var value = topicRecord[key];
                if(value === null) value = undefined;
                if(typeof value === 'object'){
                    value = value.toString();
                }

                results.push({
                    path: ['topicsById', topicId, key],
                    value: value
                });
            });
        });
        return results;
    };
}

module.exports = [
    {
        route: 'topicsById[{integers:topicIds}][\'id\',\'title\',\'hashtag\',\'created_at\',\'views\',\'user_id\']',
        get: function(pathSet) {
            return topicService
                .getTopics(pathSet.topicIds)
                .then(pushTopics('topicsById', pathSet.topicIds, pathSet[2]))
                .catch(function(why){
                    process.stdout.write('catch#topicsById' + why + why.stack);
                });
        }
    },
    {
        route: 'topicsById[{integers:topicIds}].links.length',
        get: function(pathSet) {
            return topicService
                .getTopics(pathSet.topicIds)
                .then(pushTopics('topicsById', pathSet.topicIds, pathSet[2]))
                .catch(function(why){
                    process.stdout.write('catch#topicsById.links.length' + why + why.stack);
                });
        }
    },
    {
        route: 'latestTopics[{integers:n}][\'id\',\'title\',\'hashtag\',\'created_at\',\'views\',\'user_id\']',
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
                            if(typeof value === 'object') value = value.toString();
                            results.push({
                                path: ['latestTopics', n, key],
                                value: value
                            });
                        });
                    });
                    return results;
                }).catch(function(why){
                    process.stdout.write('catch#latestTopics' + why + why.stack);
                });
        }
    }
];
