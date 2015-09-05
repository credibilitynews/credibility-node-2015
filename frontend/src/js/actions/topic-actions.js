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
        .get(['topicsById', {from: 1, to: 3}, ['title', 'hashtag', 'created_at', 'views', 'user_id']])
        .then(function(response) {
            console.log(response.json);
            document.write('response: '+response.json);
        }).catch(function(why){console.log(why)});
    },
    fetchLatestTopics: function(){
        model
        .get(["latestTopics", {from:0, to:10}, ['id']])
        .then(function(response) {
            console.log(response.json);
            document.write('response: '+response.json);
        }).catch(function(why){console.log(why)});
    }
};

if(typeof window !== "undefined") window.TopicActions = TopicActions;
module.exports = TopicActions;
