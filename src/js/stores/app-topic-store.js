var AppDispatcher = require('../dispatchers/app-dispatcher'),
    ActionTypes = require('../constants/app-constants').ActionTypes;

var merge = require('object-assign'),
    EventEmitter = require('events').EventEmitter,
    Immutable = require('immutable');

var CHANGE_EVENT = "topics-change";

var _topics = Immutable.Map();

var TopicStore = merge(EventEmitter.prototype, {
    parseTopic: parseTopic,
    parseTopics: parseTopics,

    emitChange: function(){
        this.emit(CHANGE_EVENT);
    },
    addChangeListener: function(callback){
        this.on(CHANGE_EVENT, callback);
    },
    removeChangeListener: function(callback){
        this.removeListener(CHANGE_EVENT, callback);
    },
    getTopic: function(topicId){
        return _topics.get(topicId);
    },
    getAllTopics: function(){
        return _topics.toList();
    },
    dispatcherIndex: AppDispatcher.register(function(payload){
        var action = payload.action;
        switch(action.actionType){
            case ActionTypes.RECEIVE_LAYOUT:
                console.log("store/topic-store", payload.action.layout.latest_topics);
                _addTopics(parseTopics(payload.action.layout.latest_topics));
                break;
            case ActionTypes.ADD_TOPIC:
                _addTopic(parseTopic(payload.action.topic))
                break;
        }
        TopicStore.emitChange();
        return true;
    })
})

module.exports = TopicStore;

function _addTopic(topic){
    _topics = _topics.set(topic.id ,topic);
}

function _addTopics(topics){
    topics.forEach(function(topic){
        _addTopic(topic);
    });
}

function parseTopic(topic){
    return topic;
}

function parseTopics(topics){
    return topics.map(function(topic){
        return parseTopic(topic);
    });
}
