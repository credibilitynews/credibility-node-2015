var AppDispatcher = require('../dispatchers/app-dispatcher'),
    ActionTypes = require('../constants/app-constants').ActionTypes;

var merge = require('object.assign'),
    EventEmitter = require('events').EventEmitter,
    Immutable = require('immutable');

var CHANGE_EVENT = "articles-change";

var _articles = Immutable.List();

function _addArticle(article){
    _articles = _articles.push(article);
}

function _addArticles(articles){
    _articles = _articles.concat(articles);
}

var emitter = Object.create(EventEmitter.prototype);
var ArticleStore = merge(emitter, {
    emitChange: function(){
        this.emit(CHANGE_EVENT);
    },
    addChangeListener: function(callback){
        this.on(CHANGE_EVENT, callback);
    },
    removeChangeListener: function(callback){
        this.removeListener(CHANGE_EVENT, callback);
    },
    getAllArticles: function(){
        return _articles;
    },
    dispatcherIndex: AppDispatcher.register(function(payload){
        var layout = payload.action.layout,
            action = payload.action;
        switch(action.actionType){
            case ActionTypes.RECEIVE_LAYOUT:
                //console.log("store/latest-article-store", layout.latest_articles);
                _addArticles(layout.latest_articles);
                break;
        }
        ArticleStore.emitChange();
        return true;
    })
})

module.exports = ArticleStore;
