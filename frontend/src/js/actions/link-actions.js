import model from 'falcor-model';

import {ActionTypes} from 'constants/app-constants';
import AppDispatcher from 'dispatchers/app-dispatcher';

var LinkActions = {
    fetchLinks: function(ids){
        var dispatch = function(links){
            AppDispatcher.handleServerAction({
                actionType: ActionTypes.FETCH_LINKS,
                links: links
            });
        };

        return model()
        .get(['linksById', ids, ['title', 'url', 'created_at', 'views', 'user_id', 'topic_id', 'bias', 'author_id', 'news_agency_id', 'content_type']])
        .then(function(response) {
            //console.log('linksById', response.json);
            dispatch(response.json.linksById);
        })
        .catch(function(why){
            // console.log('linksById/catch', why);
        });
    },
    fetchTagLinks: function(tagId){
        // console.log('fetchTagLinks', tagId);
        var dispatch = function(links){
            AppDispatcher.handleServerAction({
                actionType: ActionTypes.FETCH_TAG_LINKS,
                links: links
            });
        };
        return model()
        .call(
            ['taggedLinks', {from: 0, to: 4}, ['id', 'title', 'url', 'user_id', 'user_name', 'topic_id', 'topic_title', 'bias', 'author_id', 'news_agency_id', 'content_type', 'tag_name']],
            [tagId]
        )
        .then(function(response) {
            // console.log('latestLinks/result', response.json);
            dispatch(response.json.latestLinks);
        })
        .catch(function(why){
            // console.log('latestLinks/catch', why);
        });
    },
    fetchLatestLinks: function(){
        var dispatch = function(links){
            AppDispatcher.handleServerAction({
                actionType: ActionTypes.FETCH_LATEST_LINKS,
                links: links
            });
        };
        return model()
        .get(
            ['latestLinks', {from: 0, to: 4}, ['id', 'title', 'url', 'user_id', 'user_name', 'topic_id', 'topic_title', 'bias', 'author_id', 'news_agency_id', 'content_type']]
        )
        .then(function(response) {
            // console.log('latestLinks/result', response.json);
            dispatch(response.json.latestLinks);
        })
        .catch(function(why){
            // console.log('latestLinks/catch', why);
        });
    },
    fetchTopicLinks: function(topicId){
        console.log('fetchTopicLinks', topicId);
        var dispatch = function(links){
            AppDispatcher.handleServerAction({
                actionType: ActionTypes.FETCH_TOPIC_LINKS,
                topicId: topicId,
                links: links
            });
        };

        return model()
        .call(
            ['linksByTopicId', {from: 0, to: 25}, ['id', 'title', 'url', 'user_id', 'user_name', 'topic_id', 'topic_title', 'bias', 'author_id', 'news_agency_id', 'content_type']],
            [topicId]
        )
        .then(function(response) {
            console.log('linksByTopicId', response.json);
            dispatch(response.json.latestLinks);
        })
        .catch(function(why){
            console.log('linksByTopicId/catch', why);
        });
    }
};

module.exports = LinkActions;
