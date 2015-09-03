var jsonGraph = require('falcor-json-graph');
var $ref = jsonGraph.ref;
var $error = jsonGraph.error;

var linkService = require('../services/link-service');

module.exports = [
    {
        route: "linksById[{integers:linkIds}]['title', 'url', 'created_at', 'views', 'user_id', 'topic_id', 'type']",
        get: function(pathSet) {
            var userId = this.userId;

            return linkService
                .getLinks(pathSet.linkIds)
                .then(function(links) {
                    var results = [];
                    //console.log('pathSet', pathSet);
                    pathSet.linkIds.forEach(function(linkId) {
                        var linkRecord = links[linkId];
                        pathSet[2].forEach(function(key) {
                            var value = linkRecord ? linkRecord[key] : undefined;

                            switch(key){
                                case "type": value = value ? $ref(['typesById', value]) : value; break;
                                case "user_id": value = value ? $ref(['usersById', value]) : value; break;
                                case "topic_id": value = value ? $ref(['topicsById', value]) : value; break;
                                default: value = value; break;
                            }
                            results.push({
                                path: ['linksById', linkId, key],
                                value: value
                            });
                        });

                    });
                    return results;
                }).catch(function(why){console.log(why)});
        }
    },
    {
        route: "latestLinks[{integers:n}]['id']",
        get: function(pathSet, args) {
            console.log(pathSet.n.slice(-1)[0], pathSet.n[0]);
            var userId = this.userId;
            console.log(pathSet.n)
            var limit = pathSet.n.slice(-1)[0] - pathSet.n[0] + 1;
            var offset = pathSet.n[0];

            return linkService
                .getLatestLinks(offset, limit)
                .then(function(links) {

                    var results = [];
                    var linkIds = Object.keys(links);
                    pathSet.n.forEach(function(n, index) {

                        var id = linkIds[index];
                        var linkRecord = links[id];
                        var value = !linkRecord ? null : $ref(['linksById', linkRecord.id]);

                        results.push({
                            path: ['latestLinks', n, 'id'],
                            value: value
                        });
                    });
                    return results;
                }).catch(function(why){console.log(why)});
        }
    }
]
