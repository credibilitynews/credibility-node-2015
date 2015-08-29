var ActionTypes = require('../constants/app-constants').ActionTypes,
    AppDispatcher = require('../dispatchers/app-dispatcher');

var request = function(){
    return require('superagent');
};
var ServerActions = {
    fetchLayout: function(){

        request()
        .get('http://localhost:8080/v1/home')
        .set('Accept', 'application/json')
        .end(function(err, res){
            var data = res.body.data;
            console.log("server-actions/fetch-layout", data);
            AppDispatcher.handleServerAction({
                actionType: ActionTypes.RECEIVE_LAYOUT,
                layout: data
            });
        });
    },
    fetchTopic: function(topicId){
        request()
        .get('http://localhost:8080/v1/topic/'+topicId)
        .set('Accept', 'application/json')
        .end(function(err, res){
                var data = res.body.data;
                console.log("server-actions/fetch-topic", data);
                AppDispatcher.handleServerAction({
                    actionType: ActionTypes.RECEIVE_TOPIC,
                    topic: data
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
    login: function(username, password){
        request()
        .post('http://localhost:8080/v1/user/login')
        .send({username: username, password: password})
        .end(function(err, res){
            console.log('http.post', res)
            var data = res.body.data;
            console.log('server-actions/login', data);
            AppDispatcher.handleServerAction({
                actionType: ActionTypes.LOGIN,
                token: data.token,
                error: data.error
            });
        });

    }
}
if(typeof window !== "undefined") window.ServerActions = ServerActions;
module.exports = ServerActions;
