/* eslint-disable class-methods-use-this */
import Immutable from "immutable";
import { ReduceStore } from "flux/utils";

import { ActionTypes } from "constants/app-constants";
import AppDispatcher from "dispatchers/app-dispatcher";

function addUsers(state, users) {
  Object.keys(users).forEach((key) => {
    state = state.set(key.toString(), users[key]);
  });
}
class UserStore extends ReduceStore {
  getInitialState() {
    return {
      users: Immutable.Map(),
    };
  }

  getUser = (id) => {
    // var u = _users.get(id.toString());
    return this.getState().users.get(id.toString());
  };

  reduce(state, payload) {
    const { action } = payload;

    switch (action.actionType) {
      // case ActionTypes.LOGIN:
      //     console.log(payload)
      //     if(data.token)
      //         this.emit(LOGIN_EVENT_SUCCESS, data.token);
      //     if(data.errors)
      //         this.emit(LOGIN_EVENT_ERROR, data.error);
      //     break;
      case ActionTypes.FETCH_USERS_BY_ID:
        return {
          ...state,
          users: addUsers(state.users, action.users),
        };

      default:
        break;
    }

    return state;
  }
}

const instance = new UserStore(AppDispatcher);
export default instance;
