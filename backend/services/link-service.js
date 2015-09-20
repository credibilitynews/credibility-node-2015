var Sequelize = require('sequelize');
var sequelize = new Sequelize(process.env.DATABASE_URL);
var Links = sequelize.define('links', {
    "title": Sequelize.STRING,
    "url": Sequelize.STRING,
    "user_id": Sequelize.INTEGER,
    "topic_id": Sequelize.INTEGER,
    "bias": Sequelize.INTEGER,
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

function LinkService() {}
LinkService.prototype = {
    getLinks: function(linkIds){
        return new Promise(function (resolve, reject) {
            Links
            .findAll({
                where: {
                    id: {
                        $in: linkIds
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
    getLatestLinks: function(offset, limit){
        return new Promise(function (resolve, reject) {
            Links
            .findAll({
                where: {
                    active: true
                },
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

module.exports = new LinkService();
