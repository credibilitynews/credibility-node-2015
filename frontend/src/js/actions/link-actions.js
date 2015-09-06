var model = require('falcor-model');

var ActionTypes = require('../constants/app-constants').ActionTypes,
    AppDispatcher = require('../dispatchers/app-dispatcher');

var request = function(){
    return require('superagent');
};
var LinkActions = {
    fetchLinks: function(ids){
        model
        .get(["linksById", {from: 0, to: 1}, ['title', 'url', 'created_at', 'views', 'user_id', 'topic_id', 'type']])
        .then(function(response) {
            console.log('linksById', response.json);
        }).catch(function(why){console.log(why)});
    },
    fetchLatestLinks: function(){
        var dispatch = function(links){
            AppDispatcher.handleServerAction({
                actionType: ActionTypes.FETCH_LATEST_LINKS,
                links: links
            })
        };
        model
        .get(["latestLinks", {from: 0, to: 4}, ['id', 'title', 'url', 'user_id', 'topic_id']])
        .then(function(response) {
            console.log('latestLinks/result', response.json);
            dispatch(response.json['latestLinks']);
        })
        .catch(function(why){console.log(why)});
    }
};

if(typeof window !== "undefined") window.LinkActions = LinkActions;
module.exports = LinkActions;
