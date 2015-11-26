import jsonGraph from 'falcor-json-graph';
var $ref = jsonGraph.ref;
var $error = jsonGraph.error;

import tagService from '../services/tag-service';

module.exports = [
    {
        route: 'tagsById[{integers:tagIds}][\'id\', \'name\', \'code\', \'parent_id\']',
        get: function(pathSet) {
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
                            case parent_id: value = value ? $ref(['tagsById', value]) : value; break;
                            default: value = value; break;
                            }
                            results.push({
                                path: ['tagsById', tagId, key],
                                value: value
                            });
                        });

                    });
                    return results;
                }).catch(function(why){console.log('tagsById/error', why);});
        }
    },
    {
        route: 'tags[{integers:n}][\'id\', \'name\', \'code\', \'parent_id\', \'topic_count\']',
        get: function(pathSet) {
            return tagService
                .getAllTags()
                .then(function(tags) {
                    var results = [];
                    Object.keys(tags).forEach(function(tagId, index) {
                        var tagRecord = tags[tagId] || {};
                        pathSet[2].forEach(function(key){
                            var value = tagRecord[key];
                            if(value === null) value = undefined;
                            if(typeof value === 'object') value = value.toString();

                            results.push({
                                path: ['tags', index, key],
                                value: value
                            });
                        });

                    });
                    return results;
                }).catch(function(why){console.log('tags/error', why);});
        }
    },
    {
        route: 'topTags[{integers:n}][\'id\', \'name\', \'code\', \'parent_id\']',
        get: function(pathSet) {
            console.log('???');
            return tagService
                .getTopTags()
                .then(function(tags) {
                    var results = [];
                    Object.keys(tags).forEach(function(tagId, index) {
                        var tagRecord = tags[tagId] || {};
                        pathSet[2].forEach(function(key){
                            var value = tagRecord[key];
                            if(value === null) value = undefined;
                            if(typeof value === 'object') value = value.toString();

                            results.push({
                                path: ['topTags', index, key],
                                value: value
                            });
                        });

                    });
                    return results;
                }).catch(function(why){console.log('tags/error', why);});
        }
    },
    {
        route: 'tags.length',
        get: function(pathSet) {
            return tagService
                .getTagsCount()
                .then(function(length) {
                    return {
                        path: ['tags', 'length'],
                        value: length
                    };
                }).catch(function(why){console.log('tags.length/error', why);});
        }
    }
];
