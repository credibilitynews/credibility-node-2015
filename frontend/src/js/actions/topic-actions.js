import model from "../falcor-model";

import { arrayize } from "utils/object";
import { ActionTypes } from "../constants/app-constants";
import AppDispatcher from "../dispatchers/app-dispatcher";
import App from "../components/app";

const TopicActions = {
  searchTopic(query, cb) {
    return model()
      .call(["searchTopic", ["topics"]], [query])
      .then((response) => {
        cb(arrayize(response.json.searchTopic.topics));
      })
      .catch((why) => {
        // console.log('searchTopic/catch', why);
      });
  },
  fetchTopicsById(ids) {
    // console.log('fetchTopicsById', ids);

    return model()
      .get([
        "topicsById",
        ids,
        ["id", "title", "hashtag", "created_at", "views", "user_id"],
      ])
      .then((response) => {
        // console.log('result/fetchTopicsById', ids, response.json);
        // FIXME
        setTimeout(
          () =>
            AppDispatcher.handleServerAction({
              actionType: ActionTypes.FETCH_TOPICS_BY_ID,
              topics: response.json.topicsById,
            }),
          0
        );
      })
      .catch((why) => {
        // console.log('topicsById/catch', why);
      });
  },
  fetchLatestTopics(store) {
    return model()
      .get([
        "latestTopics",
        { from: 0, to: 4 },
        ["id", "title", "hashtag", "created_at", "views", "user_id"],
      ])
      .then((response) => {
        // FIXME: dispatch in dispatch
        setTimeout(
          () =>
            AppDispatcher.handleServerAction({
              actionType: ActionTypes.FETCH_RECENT_TOPICS,
              topics: response.json.latestTopics,
            }),
          0
        );
      })
      .catch((why) => {
        // console.log('latestTopics/catch', why);
      });
  },
};

export default TopicActions;
