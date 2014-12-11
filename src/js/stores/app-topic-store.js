var AppDispatcher = require('../dispatchers/app-dispatcher'),
    ActionTypes = require('../constants/app-constants').ActionTypes;

var merge = require('object-assign'),
    EventEmitter = require('events').EventEmitter,
    Immutable = require('immutable');

var CHANGE_EVENT = "topics-change";

var _topics = Immutable.List();

function _addTopic(topic){
    _topics = _topics.push(topic);
}

function _addTopics(topics){
    _topics = _topics.concat(topics);
}

var TopicStore = merge(EventEmitter.prototype, {
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
        return _topics
        .reduce(function(selected, topic){
            if(topicId == topic.id){
                return topic;
            }else{
                return selected;
            }
        }, null);
    },
    getAllTopics: function(){
        return _topics;
    },
    dispatcherIndex: AppDispatcher.register(function(payload){
        var action = payload.action;
        switch(action.actionType){
            case ActionTypes.RECEIVE_LAYOUT:
                console.log("store/topic-store", payload.action.layout.latest_topics);
                _addTopics(payload.action.layout.latest_topics);
                break;
            case ActionTypes.ADD_TOPIC:
                _addTopic(payload.action.topic)
                break;
        }
        TopicStore.emitChange();
        return true;
    })
})

module.exports = TopicStore;
