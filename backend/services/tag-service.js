import Sequelize from 'sequelize';
var sequelize = new Sequelize(process.env.DATABASE_URL, {native: true});
var Tags = sequelize.define('tags', {
    'name': Sequelize.STRING,
    'code': Sequelize.STRING,
    'parent_id': Sequelize.INTEGER
}, {
    timestamps: false
});

import batch from './batch';
import path from 'path';
import Promise from 'promise';

var conString = process.env.DATABASE_URL;

function TagService() {}
TagService.prototype = {
    getTags: function(tagIds){
        return new Promise(function (resolve, reject) {
            Tags
            .findAll({
                where: {
                    id: {
                        $in: tagIds
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
    getAllTags: function(){
        return new Promise(function (resolve, reject) {
            Tags
            .findAll({
                order: [['name', 'asc']]
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
    getTagsCount: function(){
        return new Promise(function (resolve, reject) {
            Tags
            .findAll({})
            .then(function(result){
                resolve(result.length);
            })
            .catch(function(why){
                console.log('caught:', why);
                reject(why);
            });
        });
    }
};

module.exports = new TagService();
