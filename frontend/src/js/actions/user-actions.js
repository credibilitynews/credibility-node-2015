var model = require('falcor-model');

var ActionTypes = require('constants/app-constants').ActionTypes,
    AppDispatcher = require('dispatchers/app-dispatcher');

var request = function(){
    return require('superagent');
};
var UserActions = {
    fetchUsersById: function(ids){
        //console.log('fetchUsersById', ids);
        model()
        .get(['usersById', ids, ['id', 'name', 'email', 'active', 'created_at']])
        .then(function(response) {
            //console.log('fetchUsersById/result', ids, response.json);
            AppDispatcher.handleServerAction({
                actionType: ActionTypes.FETCH_USERS_BY_ID,
                users: response.json['usersById']
            });
        }).catch(function(why){console.log('usersById/error', why);});
    },
    fetchLatestUsers: function(){
        model()
        .get(['latestUsers', {from:0, to:4}, ['id']])
        .then(function(response) {
            //console.log(response.json);
            //document.write('response: '+response.json);
        }).catch(function(why){console.log('latestUsers/error', why);});
    }
};

if(typeof window !== 'undefined') window.UserActions = UserActions;
module.exports = UserActions;
