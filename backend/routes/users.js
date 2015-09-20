var jsonGraph = require('falcor-json-graph');
var $ref = jsonGraph.ref;
var $error = jsonGraph.error;

var userService = require('../services/user-service');

module.exports = [
    {
        route: "usersById[{integers:userIds}]['id', 'name', 'email', 'active', 'created_at']",
        get: function(pathSet) {
            var userId = this.userId;
            return userService
                .getUsers(pathSet.userIds)
                .then(function(users) {
                    var results = [];
                    pathSet.userIds.forEach(function(userId) {
                        var userRecord = users[userId] || {};

                        pathSet[2].forEach(function(key) {
                            var value = userRecord[key] || "";

                            if(typeof value === "object") value = value.toString();

                            results.push({
                                path: ['usersById', userId, key],
                                value: value.toString()
                            });
                        });

                    });
                    return results;
                }).catch(function(why){console.log('usersById/error', why)});
        }
    },
    {
        route: "latestUsers[{integers:n}]['id']",
        get: function(pathSet, args) {
            var userId = this.userId;
            var limit = pathSet.n.slice(-1)[0] - pathSet.n[0] + 1;
            var offset = pathSet.n[0];

            return userService
                .getLatestUsers(offset, limit)
                .then(function(users) {

                    var results = [];
                    var userIds = Object.keys(users);
                    pathSet.n.forEach(function(n, index) {

                        var id = userIds[index];
                        var userRecord = users[id];
                        var value = !userRecord ? null : $ref(['usersById', userRecord.id]);

                        results.push({
                            path: ['latestUsers', n, 'id'],
                            value: value
                        });
                    });
                    return results;
                }).catch(function(why){console.log('latestUsers/error', why)});
        }
    }
];
