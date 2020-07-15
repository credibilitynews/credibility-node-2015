import model from "../falcor-model";

import { ActionTypes } from "../constants/app-constants";
import AppDispatcher from "../dispatchers/app-dispatcher";

export const fetchAllTags = () => {
  const fetchTagsWithLength = function (length) {
    model()
      .get(["tags", { length }, ["id", "name", "code", "parent_id"]])
      .then((response) => {
        // console.log(response.json);
        AppDispatcher.handleServerAction({
          actionType: ActionTypes.FETCH_ALL_TAGS,
          tags: response.json.tags,
        });
      })
      .catch((why) => {
        // console.log('tags', why);
      });
  };
  return model()
    .get("tags.length")
    .then((response) => {
      const { length } = response.json.tags;
      fetchTagsWithLength(length);
    })
    .catch((why) => {
      // console.log('tags.length', why);
    });
};

export const fetchTopTags = () =>
  model()
    .get([
      "topTags",
      { length: 5 },
      ["id", "name", "code", "parent_id", "topic_count"],
    ])
    .then((response) => {
      AppDispatcher.handleServerAction({
        actionType: ActionTypes.FETCH_TOP_TAGS,
        topTags: response.json.topTags,
      });
    })
    .catch((why) => {
      // console.log('topTags', why);
    });

export const fetchTagsById = (tagIds) =>
  model()
    .get(["tagsById", tagIds, ["name", "code", "parent_id"]])
    .then((response) => {
      // console.log(response.json);
    })
    .catch((why) => {
      // console.log('tagsById', why);
    });
