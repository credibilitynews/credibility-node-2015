import jsonGraph from 'falcor-json-graph';
var $ref = jsonGraph.ref;
var $error = jsonGraph.error;

import linkService from '../services/link-service';

module.exports = [
    {
        route: 'linksById[{integers:linkIds}][\'id\', \'title\', \'url\', \'created_at\', \'updated_at\', \'views\', \'user_id\', \'topic_id\', \'bias\', \'author_id\', \'news_agency_id\', \'content_type\', \'topic_title\', \'user_name\']',
        get: function(pathSet) {
            return linkService
                .getLinks(pathSet.linkIds)
                .then(function(links) {
                    var results = [];
                    pathSet.linkIds.forEach(function(linkId) {
                        var linkRecord = links[linkId] || {};
                        pathSet[2].forEach(function(key) {
                            var value = linkRecord[key];

                            if(value === null) value = undefined;
                            if(typeof value === 'object') value = value.toString();

                            results.push({
                                path: ['linksById', linkId, key],
                                value: value
                            });
                        });

                    });
                    return results;
                }).catch(function(why){
                    console.log('linksById/get'+ why + why.stack);
                });
        }
    },
    {
        route: 'latestLinks[{integers:n}][\'id\', \'title\', \'url\', \'created_at\', \'updated_at\', \'views\', \'user_id\', \'user_name\', \'topic_id\', \'topic_title\', \'bias\', \'author_id\', \'news_agency_id\', \'content_type\']',
        get: function(pathSet) {
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

                        var fields = pathSet[2];
                        fields.forEach(function(field){
                            var value = linkRecord && linkRecord[field] ? linkRecord[field].toString() : undefined;

                            results.push({
                                path: ['latestLinks', n, field],
                                value: value
                            });
                        });

                    });
                    return results;
                }).catch(function(why){
                    console.log('catch#latestLinks'+ why + why.stack);
                });
        }
    },
    {
        route: 'taggedLinks[{integers:n}][\'id\', \'title\', \'url\', \'created_at\', \'updated_at\', \'views\', \'user_id\', \'user_name\', \'topic_id\', \'topic_title\', \'bias\', \'author_id\', \'news_agency_id\', \'content_type\', \'tag_name\']',
        call: function(pathSet, args) {
            var limit = pathSet.n.slice(-1)[0] - pathSet.n[0] + 1;
            var offset = pathSet.n[0];

            return linkService
                .getTaggedLinks(offset, limit, args[0])
                .then(function(links) {

                    var results = [];
                    var linkIds = Object.keys(links);
                    pathSet.n.forEach(function(n, index) {
                        var id = linkIds[index];
                        var linkRecord = links[id];

                        var fields = pathSet[2];
                        fields.forEach(function(field){
                            var value = linkRecord && linkRecord[field] ? linkRecord[field].toString() : undefined;

                            results.push({
                                path: ['latestLinks', n, field],
                                value: value
                            });
                        });

                    });
                    return results;
                }).catch(function(why){
                    console.log('catch#taggedLinks'+ why + why.stack);
                });
        }
    },
    {
        route: 'linksByTopicId[{integers:n}][\'id\', \'title\', \'url\', \'created_at\', \'views\', \'user_id\', \'user_name\', \'topic_id\', \'topic_title\', \'bias\', \'author_id\', \'news_agency_id\', \'content_type\', \'tag_name\']',
        call: function(pathSet, args) {
            var limit = pathSet.n.slice(-1)[0] - pathSet.n[0] + 1;
            var offset = pathSet.n[0];

            return linkService
                .getLinksByTopicId(offset, limit, args[0])
                .then(function(links) {

                    var results = [];
                    var linkIds = Object.keys(links);
                    pathSet.n.forEach(function(n, index) {
                        var id = linkIds[index];
                        var linkRecord = links[id];

                        var fields = pathSet[2];
                        fields.forEach(function(field){
                            var value = linkRecord && linkRecord[field] ? linkRecord[field].toString() : undefined;

                            results.push({
                                path: ['latestLinks', n, field],
                                value: value
                            });
                        });

                    });
                    return results;
                }).catch(function(why){
                    console.log('catch#linksByTopicId' + why + why.stack);
                });
        }
    },
    {
        route: 'fetchUrlMeta[\'title\', \'author\', \'image\', \'article\', \'hashtags\', \'polarity\', \'subjectivity\']',
        call: function(pathSet, args){
            return linkService
            .fetchUrlMeta(args[0])
            .then((meta) => {
                var results = [];
                var fields = pathSet[1];

                fields.forEach((field) => {
                    results.push({
                        path: ['fetchUrlMeta', field],
                        value: meta.extract[field]
                    });
                });

                results.push({
                    path: ['fetchUrlMeta', 'hashtags'],
                    value: meta.hashtags.hashtags.slice(0, 5).join(' ')
                });

                results.push({
                    path: ['fetchUrlMeta', 'polarity'],
                    value: meta.sentiment.polarity + ' (' + meta.sentiment.polarity_confidence + ')'
                });
                results.push({
                    path: ['fetchUrlMeta', 'subjectivity'],
                    value: meta.sentiment.subjectivity + ' (' + meta.sentiment.subjectivity_confidence + ')'
                });

                return results;
            })
            .catch(function(why){
                console.log('routes/catch#fetchUrlMeta' + why + why.stack);
            });
        }
    },
    {
        route: 'postNewLink[\'id\', \'errors\']',
        call: function(pathSet, args){
            console.log(args);

            return linkService
            .postNewLink(args[0], this.userId)
            .then((result) => {
                var results = [];
                results.push({
                    path: ['postNewLink', 'id'],
                    value: result.id
                });
                results.push({
                    path: ['postNewLink', 'errors'],
                    value: result.errors
                });
                return results;
            })
            .catch(function(why){
                console.log('routes/catch#fetchUrlMeta' + why + why.stack);
            });
        }
    }
];
