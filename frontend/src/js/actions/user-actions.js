import model from "../falcor-model";

import { ActionTypes } from "constants/app-constants";
import AppDispatcher from "dispatchers/app-dispatcher";

const UserActions = {
  fetchUsersById(ids) {
    // console.log('fetchUsersById', ids);
    return model()
      .get(["usersById", ids, ["id", "name", "email", "active", "created_at"]])
      .then((response) => {
        // console.log('fetchUsersById/result', ids, response.json);
        AppDispatcher.handleServerAction({
          actionType: ActionTypes.FETCH_USERS_BY_ID,
          users: response.json.usersById,
        });
      })
      .catch((why) => {
        // console.log('usersById/error', why);
      });
  },
  fetchLatestUsers() {
    return model()
      .get(["latestUsers", { from: 0, to: 4 }, ["id"]])
      .then((response) => {
        // console.log(response.json);
        // document.write('response: '+response.json);
      })
      .catch((why) => {
        // console.log('latestUsers/error', why);
      });
  },
};

export default UserActions;
