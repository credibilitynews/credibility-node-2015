var Sequelize = require('sequelize');
var sequelize = new Sequelize(process.env.DATABASE_URL);
var Users = sequelize.define('users', {
    "name": Sequelize.STRING,
    "email": Sequelize.STRING,
    "password": Sequelize.STRING,
    "active": Sequelize.BOOLEAN,
    "created_at": Sequelize.DATE,
    "updated_at": Sequelize.DATE
}, {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});


var batch = require('./batch');
var path = require('path');
var Promise = require('promise');

var conString = process.env.DATABASE_URL;

function UserService() {}
UserService.prototype = {
    getUsers: function(userIds){
        return new Promise(function (resolve, reject) {
            Users
            .findAll({
                where: {
                    id: {
                        $in: userIds
                    }
                }
            })
            .then(function(result){
                var values = result.reduce(function(reduced, row){
                     row = row.dataValues;
                     reduced[row.id] = row;
                     return reduced;
                }, {})
                resolve(values);
            })
            .catch(function(why){
                console.log('caught:', why);
                reject(why);
            });
        });
    },
    getLatestUsers: function(offset, limit){
        return new Promise(function (resolve, reject) {
            Users
            .findAll({
                order: [['created_at', 'desc']],
                limit: limit,
                offset: offset
            })
            .then(function(result){
                var values = result.reduce(function(reduced, row){
                     row = row.dataValues;
                     reduced[row.id] = row;
                     return reduced;
                }, {})
                resolve(values);
            })
            .catch(function(why){
                console.log('caught:', why);
                reject(why);
            });
        });
    }
};

module.exports = new UserService();
