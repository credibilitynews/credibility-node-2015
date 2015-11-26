import AppDispatcher from '../dispatchers/app-dispatcher';
import {ActionTypes as ActionTypes} from '../constants/app-constants';

import assign from 'object-assign';
import Store from 'stores/app-store';
import Immutable from 'immutable';

var CHANGE_EVENT = 'latest-articles-change';

var _articles = Immutable.OrderedMap();

function _addArticle(article){
    _articles = _articles.set(article.id, article);
}

var ArticleStore = assign({}, Store, {
    events: {
        CHANGE_EVENT: CHANGE_EVENT
    },
    getAllArticles: function(){
        return _articles.toArray();
    },
    dispatcherIndex: AppDispatcher.register(function(payload){
        var action = payload.action;

        switch(action.actionType){
        case ActionTypes.FETCH_LATEST_LINKS:
            _articles = Immutable.OrderedMap();
            //console.log("store/latest-article-store", action);
            Object.keys(action.links).forEach(function(n){
                var link = action.links[n];

                _addArticle(link);
            });
            ArticleStore.emitChange();
            break;
        }
        return true;
    })
});

module.exports = ArticleStore;
