var AppDispatcher = require('../dispatchers/app-dispatcher'),
    ActionTypes = require('../constants/app-constants').ActionTypes;

var assign = require('object-assign'),
    Store = require('stores/app-store'),
    Immutable = require('immutable');

var CHANGE_EVENT = 'latest-articles-change';

var _articles = Immutable.OrderedMap();

function _addArticle(article){
    _articles = _articles.set(article.id, article);
}

var ArticleStore = assign({}, Store, {
    events: {
        CHANGE_EVENT: 'latest-article-store'
    },
    getAllArticles: function(){
        return _articles.toArray();
    },
    dispatcherIndex: AppDispatcher.register(function(payload){
        var action = payload.action;

        switch(action.actionType){
        case ActionTypes.FETCH_LATEST_LINKS:
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
