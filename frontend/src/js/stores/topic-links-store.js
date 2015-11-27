import AppDispatcher from 'dispatchers/app-dispatcher';
import {ActionTypes} from 'constants/app-constants';

import Immutable from 'immutable';
import {MapStore} from 'flux/utils';

class LatestLinksStore extends MapStore {
    getAllLinks (topicId){
        var links = this.getState().get(parseInt(topicId));
        return links ? links.toArray() : [];
    }
    reduce (state, payload){
        var action = payload.action;

        switch(action.actionType){
        case ActionTypes.FETCH_TOPIC_LINKS:
            var links = Immutable.OrderedMap();
            console.log('store/topic-links-store', action);
            Object.keys(action.links).forEach(function(n){
                var link = action.links[n];
                links = links.set(link.id, link);
            });
            state = state.set(parseInt(action.topicId), links);
            break;
        }
        return state;
    }
}

const instance = new LatestLinksStore(AppDispatcher);
module.exports = instance;
