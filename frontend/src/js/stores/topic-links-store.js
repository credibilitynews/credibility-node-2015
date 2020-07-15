import AppDispatcher from "dispatchers/app-dispatcher";
import { ActionTypes } from "constants/app-constants";

import Immutable from "immutable";
import { ReduceStore } from "flux/utils";

class LatestLinksStore extends ReduceStore {
  getInitialState() {
    return Immutable.OrderedMap();
  }

  getAllLinks = (topicId) => {
    const links = this.getState().get(parseInt(topicId));
    return links ? links.toArray().map((i) => i[1]) : [];
  };

  reduce(state, payload) {
    const { action } = payload;

    switch (action.actionType) {
      case ActionTypes.FETCH_TOPIC_LINKS:
        var links = Immutable.OrderedMap();
        // console.log('store/topic-links-store', action);
        Object.keys(action.links).forEach((n) => {
          const link = action.links[n];
          links = links.set(link.id, link);
        });
        state = state.set(parseInt(action.topicId), links);
        break;
    }
    return state;
  }
}

const instance = new LatestLinksStore(AppDispatcher);
export default instance;
