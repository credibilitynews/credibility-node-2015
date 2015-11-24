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

        model()
        .get(['linksById', ids, ['title', 'url', 'created_at', 'views', 'user_id', 'topic_id', 'bias', 'author_id', 'news_agency_id', 'content_type']])
        .then(function(response) {
            //console.log('linksById', response.json);
            dispatch(response.json.linksById);
        })
        .catch(function(why){
            // console.log('linksById/catch', why);
        });
    },
    fetchLatestLinks: function(){
        var dispatch = function(links){
            AppDispatcher.handleServerAction({
                actionType: ActionTypes.FETCH_LATEST_LINKS,
                links: links
            });
        };
        model()
        .get(
            ['latestLinks', {from: 0, to: 4}, ['id', 'title', 'url', 'user_id', 'topic_id', 'topic_title', 'bias', 'author_id', 'news_agency_id', 'content_type']]
        )
        .then(function(response) {
            // console.log('latestLinks/result', response.json);
            dispatch(response.json.latestLinks);
        })
        .catch(function(why){
            // console.log('latestLinks/catch', why);
        });
    },
    fetchLinksByTopicId: function(ids){
        var dispatch = function(links){
            AppDispatcher.handleServerAction({
                actionType: ActionTypes.FETCH_LINKS_BY_TOPIC_ID,
                links: links
            });
        };

        model()
        .get(['linksByTopicId', ids, ['title', 'url', 'created_at', 'views', 'user_id', 'topic_id', 'bias', 'author_id', 'news_agency_id', 'content_type']])
        .then(function(response) {
            //console.log('linksById', response.json);
            dispatch(response.json.linksByTopicId);
        })
        .catch(function(why){
            // console.log('linksByTopicId/catch', why);
        });
    }
};

module.exports = LinkActions;
