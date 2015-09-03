var pg = require('pg');
var batch = require('./batch');
var path = require('path');
var Promise = require('promise');

var conString = process.env.DATABASE_URL;

function LinkService() {}
LinkService.prototype = {
    getLinks: function(linkIds){
        return new Promise(function (resolve, reject) {
            var query = function(err, client, done) {
                if(err) reject(err);

                var q = 'SELECT * FROM links WHERE id in ('+linkIds.join(',')+')';
                console.log(q);
                client.query(q, function(err, result) {
                    if(err) return reject(err);
                    //console.log(err, result)
                    var links = result.rows.reduce(function(reduced, item){
                        reduced[item.id] = item;
                        return reduced;
                    }, {});
                    resolve(links);
                });
            };
            pg.connect(conString, query);
        });
    },
    getLatestLinks: function(offset, limit){
        return new Promise(function (resolve, reject) {
            var query = function(err, client, done) {
                if(err) reject(err);

                var q = 'SELECT id FROM links ORDER BY created_at DESC LIMIT '+limit+ ' OFFSET '+offset;
                console.log(q);
                client.query(q, function(err, result) {
                    if(err) return reject(err);
                    //console.log(err, result);
                    var links = result.rows.reduce(function(reduced, item){
                        reduced[item.id] = item;
                        return reduced;
                    }, {});
                    resolve(links);
                });
            };
            pg.connect(conString, query);
        });
    }
};

module.exports = new LinkService();
