import Sequelize from 'sequelize';
var sequelize = new Sequelize(process.env.DATABASE_URL, {native: true});
var Users = sequelize.define('users', {
    'name': Sequelize.STRING,
    'email': Sequelize.STRING,
    'password': Sequelize.STRING,
    'active': Sequelize.BOOLEAN,
    'created_at': Sequelize.DATE,
    'updated_at': Sequelize.DATE
}, {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});


import batch from './batch';
import path from 'path';
import Promise from 'promise';

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
                }, {});
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
                }, {});
                resolve(values);
            })
            .catch(function(why){
                console.log('caught:', why);
                reject(why);
            });
        });
    },
    findOrCreateUser: function(email){
        return new Promise(function (resolve, reject){
            Users
            .findOrCreate({
                where: {email: email}
            })
            .then(function(result){
                console.log('result', result[0]['dataValues']);
                resolve(result[0]['dataValues']);
            })
            .catch(function(why){
                console.log('caught:', why);
                reject(why);
            });
        });
    }
};

module.exports = new UserService();
