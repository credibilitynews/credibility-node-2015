import AppDispatcher from 'dispatchers/app-dispatcher';
import {ActionTypes} from 'constants/app-constants';

import Immutable from 'immutable';
import {MapStore} from 'flux/utils';

class TagLinksStore extends MapStore {
    getAllLinks (tagId){
        var links = this.getState().get(tagId);
        return links ? links.toArray() : [];
    }
    reduce (state, payload){
        var action = payload.action;

        switch(action.actionType){
        case ActionTypes.FETCH_TAG_LINKS:
            var links = Immutable.OrderedMap();
            // console.log('store/tag-links-store', action);
            Object.keys(action.links).forEach(function(n){
                var link = action.links[n];
                links = links.set(link.id, link);
            });
            state = state.set(action.tagId, links);
            break;
        }
        return state;
    }
}

const instance = new TagLinksStore(AppDispatcher);
module.exports = instance;
