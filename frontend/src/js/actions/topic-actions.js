import model from 'falcor-model';

import {ActionTypes} from '../constants/app-constants';
import AppDispatcher from '../dispatchers/app-dispatcher';
import {arrayize} from 'utils/object';

var TopicActions = {
    searchTopic (query, cb) {
        return model()
        .call(['searchTopic', ['topics']], [query])
        .then(function(response) {
            cb(arrayize(response.json.searchTopic.topics));
        })
        .catch(function(why){
            // console.log('searchTopic/catch', why);
        });
    },
    fetchTopicsById (ids){
        //console.log('fetchTopicsById', ids);

        return model()
        .get(['topicsById', ids, ['id','title','hashtag','created_at','views','user_id']])
        .then(function(response) {
            //console.log('result/fetchTopicsById', ids, response.json);
            AppDispatcher.handleServerAction({
                actionType: ActionTypes.FETCH_TOPICS_BY_ID,
                topics: response.json.topicsById
            });
        }).catch(function(why){
            // console.log('topicsById/catch', why);
        });
    },
    fetchLatestTopics (){
        return model()
        .get(['latestTopics', {from:0, to:4}, ['id','title','hashtag','created_at','views','user_id']])
        .then(function(response) {
            //console.log('result/fetchLatestTopics', response.json);
            AppDispatcher.handleServerAction({
                actionType: ActionTypes.FETCH_RECENT_TOPICS,
                topics: response.json.latestTopics
            });
        }).catch(function(why){
            // console.log('latestTopics/catch', why);
        });
    }
};

module.exports = TopicActions;
