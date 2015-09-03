var AppDispatcher = require('../dispatchers/app-dispatcher'),
    ActionTypes = require('../constants/app-constants').ActionTypes;

var merge = require('object.assign'),
    EventEmitter = require('events').EventEmitter,
    Immutable = require('immutable');

var CHANGE_EVENT = "topics-change";

var _topics = Immutable.Map();

var emitter = Object.create(EventEmitter.prototype);

var TopicStore = merge(emitter, {
    parseTopic: parseTopic,
    parseTopics: parseTopics,

    emitChanges: function(topicId){
        this.emit(CHANGE_EVENT, topicId);
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
        var topicId = null;
        switch(action.actionType){
            case ActionTypes.RECEIVE_LAYOUT:
                console.log("store/topic-store/layout", payload.action.layout.latest_topics);
                _addTopics(parseTopics(payload.action.layout.latest_topics));
                break;
            case ActionTypes.RECEIVE_TOPIC:
                console.log("store/topic-store/topic", payload.action.topic);
                topicId = payload.action.topic.id;
                _addTopic(parseTopic(payload.action.topic));
                break;
            case ActionTypes.ADD_TOPIC:
                _addTopic(parseTopic(payload.action.topic))
                break;
        }
        TopicStore.emitChanges(topicId);
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
