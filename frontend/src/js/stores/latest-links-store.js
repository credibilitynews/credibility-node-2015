import AppDispatcher from "dispatchers/app-dispatcher";
import { ActionTypes } from "constants/app-constants";

import Immutable from "immutable";
import { ReduceStore } from "flux/utils";

class LatestLinksStore extends ReduceStore {
  getInitialState() {
    return Immutable.OrderedMap();
  }

  getAllLinks = () => {
    return this.getState()
      .toArray()
      .map((i) => i[1]);
  };

  reduce(state, payload) {
    const { action } = payload;

    switch (action.actionType) {
      case ActionTypes.FETCH_LATEST_LINKS:
        state = Immutable.OrderedMap();
        // console.log('store/latest-links-store', action);
        Object.keys(action.links).forEach((n) => {
          const link = action.links[n];
          state = state.set(link.id, link);
        });
        break;
    }
    return state;
  }
}

const instance = new LatestLinksStore(AppDispatcher);
export default instance;
