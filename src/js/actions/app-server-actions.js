var ActionTypes = require('../constants/app-constants').ActionTypes,
    AppDispatcher = require('../dispatchers/app-dispatcher');

var http = require('http');

var ServerActions = {
    fetchLayout: function(layout){
        http.get('http://localhost:8080/v1/home', function(res){
            var body = "";
            res.on('data', function(chunk) {
                body += chunk;
            });

            res.on('end', function() {
                var data = JSON.parse(body).data;
                console.log("actions/server-actions", data);
                AppDispatcher.handleServerAction({
                    actionType: ActionTypes.RECEIVE_LAYOUT,
                    layout: data
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
