var falcor = require('falcor'),
    HttpDataSource = require('falcor-http-datasource');
var model = new falcor.Model({source: new HttpDataSource('/model.json') });

var ActionTypes = require('../constants/app-constants').ActionTypes,
    AppDispatcher = require('../dispatchers/app-dispatcher');

var request = function(){
    return require('superagent');
};
var LinkActions = {
    fetchLinks: function(){
        model
        .get(["linksById",[1,2,3], ['title', 'url', 'created_at', 'views', 'user_id', 'topic_id', 'type']])
        .then(function(response) {
            console.log(response.json);
            document.write('response: '+response.json);
        }).catch(function(why){console.log(why)});
    },
    fetchLatestLinks: function(){
        model
        .get(["latestLinks", {from: 0, to: 10}, ['id']])
        .then(function(response) {
            console.log(response.json);
            document.write('response: '+response.json);
        }).catch(function(why){console.log(why)});
    }
};

if(typeof window !== "undefined") window.LinkActions = LinkActions;
module.exports = LinkActions;
