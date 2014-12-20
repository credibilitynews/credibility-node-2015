var ActionTypes = require('../constants/app-constants').ActionTypes,
    AppDispatcher = require('../dispatchers/app-dispatcher');

var http = require('http');

var ServerActions = {
    fetchLayout: function(){
        http.get('http://localhost:8080/v1/home', function(res){
            var body = "";
            res.on('data', function(chunk) {
                body += chunk;
            });

            res.on('end', function() {
                var data = JSON.parse(body).data;
                console.log("server-actions/fetch-layout", data);
                AppDispatcher.handleServerAction({
                    actionType: ActionTypes.RECEIVE_LAYOUT,
                    layout: data
                });
            });

        });
    },
    fetchTopic: function(topicId){
        http.get('http://localhost:8080/v1/topic/'+topicId, function(res){
            var body = "";
            res.on('data', function(chunk) {
                body += chunk;
            });

            res.on('end', function() {
                var data = JSON.parse(body).data;
                console.log("server-actions/fetch-topic", data);
                AppDispatcher.handleServerAction({
                    actionType: ActionTypes.RECEIVE_TOPIC,
                    topic: data
                });
            });

        });
    },
    addTopic: function(topic){
        AppDispatcher.handleViewAction({
            actionType: ActionTypes.ADD_TOPIC,
            topic: topic
        })
    },
    addLink: function(link){
        AppDispatcher.handleViewAction({
            actionType: ActionTypes.ADD_LINK,
            link: link
        })
    },

}

module.exports = ServerActions;
