var AppDispatcher = require('dispatchers/app-dispatcher'),
    ActionTypes = require('constants/app-constants').ActionTypes;

var assign = require('object-assign'),
    Store = require('stores/app-store'),
    Immutable = require('immutable');

var CHANGE_EVENT = "topics-change";

var _topics = Immutable.OrderedMap();

var TopicStore = assign({}, Store, {
    events: {
        CHANGE_EVENT: "app-topic-store"
    },
    getTopic: function(topicId){
        return _topics.get(topicId.toString());
    },
    getAllTopics: function(){
        return _topics.toList();
    },
    dispatcherIndex: AppDispatcher.register(function(payload){
        var action = payload.action;

        switch(action.actionType){
            case ActionTypes.FETCH_TOPICS_BY_ID:
                _addTopics(parseTopics(action.topics));
                //console.log(_topics.toArray())
                TopicStore.emitChange();
                break;
            default: break;
        }
        return true;
    })
})

module.exports = TopicStore;

function _addTopic(topic){
    _topics = _topics.set(topic.id.toString() ,topic);
}

function _addTopics(topics){
    topics.forEach(function(topic){
        _addTopic(topic);
    });
}

function parseTopics(topics){
    return Object.keys(topics).map(function(topic){
        return topics[topic];
    });
}
