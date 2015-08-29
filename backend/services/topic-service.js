var pg = require('pg');
var batch = require('./batch');
var path = require('path');
var Promise = require('promise');

var conString = process.env.DATABASE_URL;

function TopicService() {}
TopicService.prototype = {
    getTopics: function(topicIds){
        return new Promise(function (resolve, reject) {
            var query = function(err, client, done) {
                if(err) return reject(err);

                var q = 'SELECT * FROM topics WHERE id in ('+topicIds.join(',')+')';
                console.log(q);
                client.query(q, function(err, result) {
                    if(err) return reject(err);
                    //console.log(err, result)
                    var topics = result.rows.reduce(function(reduced, item){
                        reduced[item.id] = item;
                        return reduced;
                    }, {});
                    resolve(topics);
                });
            };
            pg.connect(conString, query);
        });
    },
    getLatestTopics: function(offset, limit){
        return new Promise(function (resolve, reject) {
            var query = function(err, client, done) {
                if(err) return reject(err);

                var q = 'SELECT * FROM topics ORDER BY created_at DESC LIMIT '+limit+ ' OFFSET '+offset;
                console.log(q);
                client.query(q, function(err, result) {
                    if(err) return reject(err);
                    //console.log(err, result);
                    var topics = result.rows.reduce(function(reduced, item){
                        reduced[item.id] = item;
                        return reduced;
                    }, {});
                    resolve(topics);
                });
            };
            pg.connect(conString, query);
        });
    }
};

module.exports = new TopicService();
