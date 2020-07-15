import AppDispatcher from "dispatchers/app-dispatcher";
import { ActionTypes } from "constants/app-constants";

import Immutable from "immutable";
import { ReduceStore } from "flux/utils";

class LinkStore extends ReduceStore {
  getInitialState() {
    return Immutable.OrderedMap();
  }

  getLinkById(storyId) {
    // console.log('getLinkById', this.getState().get(parseInt(storyId)));
    return this.getState().get(parseInt(storyId));
  }

  reduce(state, payload) {
    const { action } = payload;

    switch (action.actionType) {
      case ActionTypes.FETCH_LINKS:
        state = Immutable.OrderedMap();
        // console.log('store/link-store', action);
        Object.keys(action.links).forEach((n) => {
          const link = action.links[n];
          state = state.set(parseInt(link.id), link);
        });
        break;
    }
    return state;
  }
}

const instance = new LinkStore(AppDispatcher);
export default instance;
