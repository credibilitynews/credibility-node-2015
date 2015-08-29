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
        route: "latestLinks['title', 'url','created_at','views','user_id','topic_id','type']",
        call: function(callPath, args) {
            var userId = this.userId;
            var limit = args[1];
            var offset = args[0];

            return linkService
                .getLatestLinks(offset, limit)
                .then(function(links) {
                    var results = [];
                    Object.keys(links).forEach(function(linkId) {
                        var linkRecord = links[linkId];
                        callPath[1].forEach(function(key) {
                            var value = linkRecord[key];
                            switch(key){
                                case "type": value = $ref(['typesById', value]); break;
                                case "user_id": value = $ref(['usersById', value]); break;
                                case "topic_id": value = $ref(['topicsById', value]); break;
                                default: value = linkRecord[key]; break;
                            }
                            results.push({
                                path: ['latestLinks', linkId, key],
                                value: value
                            });
                        });

                    });
                    return results;
                }).catch(function(why){console.log(why)});
        }
    }
]
