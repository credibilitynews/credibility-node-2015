import {ActionTypes} from '../constants/app-constants';
import AppDispatcher from '../dispatchers/app-dispatcher';
import jsonp from '../jsonp';

var request = function(){
    return require('superagent');
};
var ServerActions = {
    addTopic: function(topic){
        AppDispatcher.handleViewAction({
            actionType: ActionTypes.ADD_TOPIC,
            topic: topic
        });
    },
    addLink: function(link){
        AppDispatcher.handleViewAction({
            actionType: ActionTypes.ADD_LINK,
            link: link
        });
    },
    fetchTagTweets(tags){
        if(typeof document !== 'undefined')
            request()
        .get('https://api.twitter.com/1.1/search/tweets.json?q=euromaiden')
        .use(jsonp)
        .end((err, res) => {
            // console.log(arguments);
        });
    }
};
module.exports = ServerActions;
