import AppDispatcher from 'dispatchers/app-dispatcher';
import {ActionTypes as ActionTypes} from 'constants/app-constants';

import assign from 'object-assign';
import Store from 'stores/app-store';
import Immutable from 'immutable';

var CHANGE_EVENT = 'topics-change';

var _topics = Immutable.OrderedMap(),
    _recentTopics = Immutable.OrderedMap();

var TopicStore = assign({}, Store, {
    events: {
        CHANGE_EVENT: CHANGE_EVENT
    },
    getTopic: function(topicId){
        return _topics.get(topicId.toString());
    },
    getAllTopics: function(){
        return _topics.toArray();
    },
    getLatestTopics: function(){
        return _recentTopics.toArray();
    },
    dispatcherIndex: AppDispatcher.register(function(payload){
        var action = payload.action;

        switch(action.actionType){
        case ActionTypes.FETCH_TOPICS_BY_ID:
            _topics = _addTopics(_topics, parseTopics(action.topics));
                //console.log(_topics.toArray())
            TopicStore.emitChange();
            break;

        case ActionTypes.FETCH_RECENT_TOPICS:
            _recentTopics = _addTopics(_recentTopics, parseTopics(action.topics));
                //console.log(_recentTopics.toArray());
            TopicStore.emitChange();
            break;

        default: break;
        }
        return true;
    })
});

module.exports = TopicStore;

function _addTopic(store, topic){
    return store.set(topic.id.toString() ,topic);
}

function _addTopics(store, topics){
    return topics.reduce(function(reduced, topic){
        return _addTopic(reduced, topic);
    }, store);
}

function parseTopics(topics){
    return Object.keys(topics).map(function(topic){
        return topics[topic];
    });
}
