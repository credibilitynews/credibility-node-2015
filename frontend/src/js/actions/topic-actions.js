var falcor = require('falcor'),
    HttpDataSource = require('falcor-http-datasource');
var model = new falcor.Model({source: new HttpDataSource('/model.json') });

var ActionTypes = require('../constants/app-constants').ActionTypes,
    AppDispatcher = require('../dispatchers/app-dispatcher');

var request = function(){
    return require('superagent');
};
var TopicActions = {
    fetchTopics: function(){
        model
        .get("topicsById[1,2,3]['title', 'hashtag', 'created_at', 'views', 'user_id']")
        .then(function(response) {
            console.log(response.json);
            document.write('response: '+response.json);
        }).catch(function(why){console.log(why)});
    },
    fetchLatestTopics: function(){
        model
        .call("latestTopics['title', 'hashtag', 'created_at', 'views', 'user_id']", [0, 5])
        .then(function(response) {
            console.log(response.json);
            document.write('response: '+response.json);
        }).catch(function(why){console.log(why)});
    }
};

if(typeof window !== "undefined") window.TopicActions = TopicActions;
module.exports = TopicActions;
