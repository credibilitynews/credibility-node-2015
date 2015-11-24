import Sequelize from 'sequelize';
import {model as Topics} from './topic-service';
import {model as Users} from './user-service';

var sequelize = new Sequelize(process.env.DATABASE_URL, {native: true});
var Links = sequelize.define('links', {
    title: Sequelize.STRING,
    url: Sequelize.STRING,
    user_id: Sequelize.INTEGER,
    topic_id: Sequelize.INTEGER,
    bias: Sequelize.INTEGER,
    active: Sequelize.BOOLEAN,
    created_at: Sequelize.DATE,
    updated_at: Sequelize.DATE
}, {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});
Links.belongsTo(Topics, { foreignKey: 'topic_id' });
Links.belongsTo(Users, { foreignKey: 'user_id' });

import batch from './batch';
import path from 'path';
import Promise from 'promise';

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
                }, {});
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
                include: [
                    Topics, Users
                ],
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
                    reduced[row.id]['topic_title'] = row.topic.title;
                    reduced[row.id]['user_name'] = row.user.name;
                    return reduced;
                }, {});
                //console.log(values);
                resolve(values);
            })
            .catch(function(why){
                console.log('caught:', why);
                reject(why);
            });
        });
    }
};

const instance = new LinkService();
instance.model = Links;
module.exports = instance;
