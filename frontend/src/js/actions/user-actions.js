var falcor = require('falcor'),
    HttpDataSource = require('falcor-http-datasource');
var model = new falcor.Model({source: new HttpDataSource('/model.json') });

var ActionTypes = require('../constants/app-constants').ActionTypes,
    AppDispatcher = require('../dispatchers/app-dispatcher');

var request = function(){
    return require('superagent');
};
var UserActions = {
    fetchUsers: function(){
        model
        .get(['usersById', {from: 1, to: 3}, ['name', 'email', 'active']])
        .then(function(response) {
            console.log(response.json);
            document.write('response: '+response.json);
        }).catch(function(why){console.log(why)});
    },
    fetchLatestUsers: function(){
        model
        .get(["latestUsers", {from:0, to:10}, ['id']])
        .then(function(response) {
            console.log(response.json);
            document.write('response: '+response.json);
        }).catch(function(why){console.log(why)});
    }
};

if(typeof window !== "undefined") window.UserActions = UserActions;
module.exports = UserActions;
