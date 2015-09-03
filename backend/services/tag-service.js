var pg = require('pg');
var batch = require('./batch');
var path = require('path');
var Promise = require('promise');

var conString = process.env.DATABASE_URL;

function TagService() {}
TagService.prototype = {
    getTags: function(tagIds){
        return new Promise(function (resolve, reject) {
            var query = function(err, client, done) {
                if(err) return reject(err);

                var q = 'SELECT * FROM tags WHERE id in ('+tagIds.join(',')+')';
                console.log(q);
                client.query(q, function(err, result) {
                    if(err) return reject(err);
                    //console.log(err, result)
                    var tags = result.rows.reduce(function(reduced, item){
                        reduced[item.id] = item;
                        return reduced;
                    }, {});
                    resolve(tags);
                });
            };
            pg.connect(conString, query);
        });
    },
    getAllTags: function(){
        return new Promise(function (resolve, reject) {
            var query = function(err, client, done) {
                if(err) return reject(err);

                var q = 'SELECT * FROM tags';
                console.log(q);
                client.query(q, function(err, result) {
                    if(err) return reject(err);
                    console.log(err, result)
                    var tags = result.rows.reduce(function(reduced, item){
                        reduced[item.id] = item;
                        return reduced;
                    }, {});
                    resolve(tags);
                });
            };
            pg.connect(conString, query);
        });
    },
    getTagsCount: function(){
        return new Promise(function (resolve, reject) {
            var query = function(err, client, done) {
                if(err) return reject(err);

                var q = 'SELECT COUNT(*) FROM tags';
                console.log(q);
                client.query(q, function(err, result) {
                    if(err) return reject(err);
                    var length = result.rows[0].count;
                    resolve(length);
                });
            };
            pg.connect(conString, query);
        });
    }
};

module.exports = new TagService();
