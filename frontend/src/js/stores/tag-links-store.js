import AppDispatcher from "dispatchers/app-dispatcher";
import { ActionTypes } from "constants/app-constants";

import Immutable from "immutable";
import { ReduceStore } from "flux/utils";

class TagLinksStore extends ReduceStore {
  getAllLinks(tagId) {
    const links = this.getState().get(tagId);
    return links ? links.toArray() : [];
  }

  reduce(state, payload) {
    const { action } = payload;

    switch (action.actionType) {
      case ActionTypes.FETCH_TAG_LINKS:
        var links = Immutable.OrderedMap();
        // console.log('store/tag-links-store', action);
        Object.keys(action.links).forEach((n) => {
          const link = action.links[n];
          links = links.set(link.id, link);
        });
        state = state.set(action.tagId, links);
        break;
    }
    return state;
  }
}

const instance = new TagLinksStore(AppDispatcher);
export default instance;
