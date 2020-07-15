/* eslint-disable class-methods-use-this */
import assign from "object-assign";
import { ReduceStore } from "flux/utils";
import Immutable from "immutable";
import { ActionTypes } from "../constants/app-constants";
import AppDispatcher from "../dispatchers/app-dispatcher";

function addTopicStat(state, topicStat) {
  state = state.push(topicStat);
  return state;
}

function addTopicStats(state, topicStats) {
  state = state.concat(topicStats);
  return state;
}

class TopicStatsStore extends ReduceStore {
  getInitialState() {
    return {
      topicStats: Immutable.List(),
    };
  }

  getTopicStat(categoryId) {
    return this.getState().topicStats.reduce((selected, item) => {
      if (categoryId == item.id) {
        return item;
      }
      return selected;
    }, null);
  }

  getAllTopicStats() {
    return this.getState().topicStats;
  }

  reduce(state, payload) {
    // console.log(state, payload);
    const { action } = payload;

    switch (action.actionType) {
      case ActionTypes.RECEIVE_LAYOUT:
        // console.log('store/topic-stats-store', payload.action.layout.latest_topics);
        return {
          ...state,
          topicStats: addTopicStats(
            state.topicStats,
            action.layout.latest_topics
          ),
        };

      case ActionTypes.ADD_TOPIC:
        return {
          ...state,
          topicStats: addTopicStat(state.topicStats, action.topic),
        };
      default:
      // do nothing
    }
    return state;
  }
}

const instance = new TopicStatsStore(AppDispatcher);
export default instance;
