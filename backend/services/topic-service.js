import Sequelize from 'sequelize';
var sequelize = new Sequelize(process.env.DATABASE_URL, {native: true});
var Topics = sequelize.define('topics', {
    title: Sequelize.STRING,
    hashtag: Sequelize.STRING,
    user_id: Sequelize.INTEGER,
    views: Sequelize.INTEGER,
    active: Sequelize.BOOLEAN,
    created_at: Sequelize.DATE,
    updated_at: Sequelize.DATE
}, {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

import batch from './batch';
import path from 'path';
import Promise from 'promise';

function TopicService() {}
TopicService.prototype = {
    searchTopic: function(query){
        query = query.toLowerCase();
        return new Promise(function (resolve, reject) {
            console.log(query);
            sequelize
            .query(`Select id, title from topics where lower(topics.title) like ?`,
                { type: sequelize.QueryTypes.SELECT, replacements: [`%${query}%`]})
            .then(function(result){
                console.log(result);
                resolve(result);
            })
            .catch(function(why){
                console.log('caught:', why);
                reject(why);
            });
        });
    },
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
                }, {});
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
                }, {});
                resolve(values);
            })
            .catch(function(why){
                console.log('caught:', why);
                reject(why);
            });
        });
    }
};
const instance = new TopicService();
instance.model = Topics;
module.exports = instance;
