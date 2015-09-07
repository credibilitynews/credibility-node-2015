var model = require('falcor-model');

var ActionTypes = require('../constants/app-constants').ActionTypes,
    AppDispatcher = require('../dispatchers/app-dispatcher');

var request = function(){
    return require('superagent');
};
var TopicActions = {
    fetchTopicsById: function(ids){
        console.log('fetchTopicsById', ids);

        model()
        .get(["topicsById", ids, ['id','title','hashtag','created_at','views','user_id']])
        .then(function(response) {
            console.log('result/fetchTopicsById', ids, response.json);

            AppDispatcher.handleServerAction({
                actionType: ActionTypes.FETCH_TOPICS_BY_ID,
                topics: response.json['topicsById']
            })
        }).catch(function(why){
            console.log(why)
        });
    },
    fetchLatestTopics: function(){
        model()
        .get(["latestTopics", {from:0, to:4}, ['id','title','hashtag','created_at','views','user_id']])
        .then(function(response) {
            console.log('result/fetchLatestTopics', response.json);

            AppDispatcher.handleServerAction({
                actionType: ActionTypes.FETCH_RECENT_TOPICS,
                topics: response.json['latestTopics']
            });
        }).catch(function(why){console.log(why)});
    }
};

if(typeof window !== "undefined") window.TopicActions = TopicActions;
module.exports = TopicActions;
