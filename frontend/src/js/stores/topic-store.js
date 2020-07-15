/* eslint-disable class-methods-use-this */
import AppDispatcher from "dispatchers/app-dispatcher";
import { ActionTypes } from "constants/app-constants";

import { ReduceStore } from "flux/utils";
import Immutable from "immutable";

function addTopic(state, topic) {
  return state.set(topic.id.toString(), topic);
}

function addTopics(state, topics) {
  return topics.reduce((reduced, topic) => addTopic(reduced, topic), state);
}

function parseTopics(topics) {
  return Object.keys(topics).map((topic) => topics[topic]);
}
class TopicStore extends ReduceStore {
  getInitialState() {
    return {
      topics: Immutable.OrderedMap(),
      recentTopics: Immutable.OrderedMap(),
    };
  }

  getTopic(topicId) {
    return this.getState().topics.get(topicId.toString());
  }

  getAllTopics() {
    return this.getState().topics.toArray();
  }

  getLatestTopics() {
    return this.getState().recentTopics.toArray();
  }

  reduce(state, payload) {
    console.log(state, payload);
    const { action } = payload;

    switch (action.actionType) {
      case ActionTypes.FETCH_TOPICS_BY_ID:
        return {
          ...state,
          topics: addTopics(state.topics, parseTopics(action.topics)),
        };

      case ActionTypes.FETCH_RECENT_TOPICS:
        return {
          ...state,
          recentTopics: addTopics(
            state.recentTopics,
            parseTopics(action.topics)
          ),
        };
      default:
      // do nothing
    }
    return true;
  }
}

const instance = new TopicStore(AppDispatcher);
export default instance;
