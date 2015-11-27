import AppDispatcher from 'dispatchers/app-dispatcher';
import {ActionTypes} from 'constants/app-constants';

import Immutable from 'immutable';
import {MapStore} from 'flux/utils';

class LatestLinksStore extends MapStore {
    getAllLinks (){
        return this.getState().toArray();
    }
    reduce (state, payload){
        var action = payload.action;

        switch(action.actionType){
        case ActionTypes.FETCH_LATEST_LINKS:
            state = Immutable.OrderedMap();
            console.log("store/latest-links-store", action);
            Object.keys(action.links).forEach(function(n){
                var link = action.links[n];
                state = state.set(link.id, link);
            });
            break;
        }
        return state;
    }
}

const instance = new LatestLinksStore(AppDispatcher);
module.exports = instance;
