var AppDispatcher = require('../dispatchers/app-dispatcher'),
    ActionTypes = require('../constants/app-constants').ActionTypes;

var assign = require('object-assign'),
    Store = require('stores/app-store'),
    Immutable = require('immutable');

var CHANGE_EVENT = 'topicStats-change';

var _topicStats = Immutable.List();

function _addTopicStat(category){
    _topicStats = _topicStats.push(category);
}

function _addTopicStats(topicStats){
    _topicStats = _topicStats.concat(topicStats);
}

var TopicStatsStore = assign({}, Store, {
    events: {
        CHANGE_EVENT: CHANGE_EVENT
    },
    getTopicStat: function(categoryId){
        return _topicStats
        .reduce(function(selected, item){
            if(categoryId == item.id){
                return item;
            }else{
                return selected;
            }
        }, null);
    },
    getAllTopicStats: function(){
        return _topicStats;
    },
    dispatcherIndex: AppDispatcher.register(function(payload){
        var action = payload.action;
        switch(action.actionType){
        case ActionTypes.RECEIVE_LAYOUT:
            // console.log('store/topic-stats-store', payload.action.layout.latest_topics);
            _addTopicStats(payload.action.layout.latest_topics);
            break;
        case ActionTypes.ADD_TOPIC:
            _addTopicStat(payload.action.topic);
            break;
        }
        TopicStatsStore.emitChange();
        return true;
    })
});

module.exports = TopicStatsStore;
