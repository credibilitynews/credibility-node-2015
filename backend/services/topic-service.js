var Sequelize = require('sequelize');
var sequelize = new Sequelize(process.env.DATABASE_URL, {native: true});
var Topics = sequelize.define('topics', {
    "title": Sequelize.STRING,
    "hashtag": Sequelize.STRING,
    "user_id": Sequelize.INTEGER,
    "views": Sequelize.INTEGER,
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

function TopicService() {}
TopicService.prototype = {
    getTopics: function(topicIds){
        return new Promise(function (resolve, reject) {
            Topics
            .findAll({
                where: {
                    id: {
                        $in: topicIds
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
    getLatestTopics: function(offset, limit){
        return new Promise(function (resolve, reject) {
            Topics
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

module.exports = new TopicService();
