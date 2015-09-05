var pg = require('pg');
var batch = require('./batch');
var path = require('path');
var Promise = require('promise');

var conString = process.env.DATABASE_URL;

function UserService() {}
UserService.prototype = {
    getUsers: function(userIds){
        return new Promise(function (resolve, reject) {
            var query = function(err, client, done) {
                if(err) return reject(err);

                var q = 'SELECT * FROM users WHERE id in ('+userIds.join(',')+')';
                console.log(q);
                client.query(q, function(err, result) {
                    if(err) return reject(err);
                    //console.log(err, result)
                    var users = result.rows.reduce(function(reduced, item){
                        reduced[item.id] = item;
                        return reduced;
                    }, {});
                    resolve(users);
                });
            };
            pg.connect(conString, query);
        });
    },
    getLatestUsers: function(offset, limit){
        return new Promise(function (resolve, reject) {
            var query = function(err, client, done) {
                if(err) reject(err);

                var q = 'SELECT id FROM users ORDER BY created_at DESC LIMIT '+limit+ ' OFFSET '+offset;
                //console.log(q);
                client.query(q, function(err, result) {
                    if(err) return reject(err);
                    //console.log(err, result);
                    var users = result.rows.reduce(function(reduced, item){
                        reduced[item.id] = item;
                        return reduced;
                    }, {});
                    resolve(users);
                });
            };
            pg.connect(conString, query);
        });
    }
};

module.exports = new UserService();
