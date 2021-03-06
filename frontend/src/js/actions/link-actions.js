import model from "../falcor-model";

import { ActionTypes } from "constants/app-constants";
import AppDispatcher from "dispatchers/app-dispatcher";

const LinkActions = {
  postNewLink(values, cb) {
    const params = Object.keys(values);
    const data = [];
    params.forEach((param) => {
      data.push(values[param]);
    });

    return model()
      .call(["postNewLink", ["id", "errors"]], [values])
      .then((response) => {
        // console.log(response);
        cb(response.json.postNewLink);
      })
      .catch((why) => {
        // console.log('actions/catch#postNewLink', why, why.stack);
      });
  },

  fetchUrlMeta(url, cb) {
    return model()
      .call(
        [
          "fetchUrlMeta",
          [
            "title",
            "author",
            "image",
            "article",
            "hashtags",
            "polarity",
            "subjectivity",
          ],
        ],
        [url]
      )
      .then((response) => {
        // console.log(response);
        cb(response.json.fetchUrlMeta);
      })
      .catch((why) => {
        // console.log('actions/catch#fetchUrlMeta', why);
      });
  },

  fetchLinks(ids) {
    const dispatch = (links) => {
      AppDispatcher.handleServerAction({
        actionType: ActionTypes.FETCH_LINKS,
        links,
      });
    };

    return model()
      .get([
        "linksById",
        ids,
        [
          "id",
          "title",
          "url",
          "created_at",
          "views",
          "user_id",
          "topic_id",
          "bias",
          "author_id",
          "news_agency_id",
          "content_type",
          "topic_title",
          "user_name",
        ],
      ])
      .then((response) => {
        // console.log('linksById', response.json);
        dispatch(response.json.linksById);
      })
      .catch((why) => {
        // console.log('linksById/catch: '+ why.stack);
      });
  },

  fetchTagLinks(tagId) {
    // console.log('fetchTagLinks', tagId);
    const dispatch = (links) => {
      AppDispatcher.handleServerAction({
        actionType: ActionTypes.FETCH_TAG_LINKS,
        tagId,
        links,
      });
    };
    return model()
      .call(
        [
          "taggedLinks",
          { from: 0, to: 4 },
          [
            "id",
            "title",
            "url",
            "user_id",
            "user_name",
            "topic_id",
            "topic_title",
            "bias",
            "author_id",
            "news_agency_id",
            "content_type",
            "tag_name",
            "created_at",
          ],
        ],
        [tagId]
      )
      .then((response) => {
        // console.log('latestLinks/result', response.json);
        setTimeout(() => dispatch(response.json.latestLinks), 0);
      })
      .catch((why) => {
        // console.log('latestLinks/catch: ' + why);
      });
  },
  fetchLatestLinks() {
    const dispatch = (links) => {
      AppDispatcher.handleServerAction({
        actionType: ActionTypes.FETCH_LATEST_LINKS,
        links,
      });
    };
    return model()
      .get([
        "latestLinks",
        { from: 0, to: 4 },
        [
          "id",
          "title",
          "url",
          "user_id",
          "user_name",
          "topic_id",
          "topic_title",
          "bias",
          "author_id",
          "news_agency_id",
          "content_type",
          "created_at",
        ],
      ])
      .then((response) => {
        // console.log('latestLinks/result', response.json);
        // FIXME
        setTimeout(() => dispatch(response.json.latestLinks), 0);
      })
      .catch((why) => {
        // console.log('latestLinks/catch: ' + why);
      });
  },
  fetchTopicLinks(topicId) {
    // console.log('fetchTopicLinks', topicId);
    const dispatch = (links) => {
      AppDispatcher.handleServerAction({
        actionType: ActionTypes.FETCH_TOPIC_LINKS,
        topicId,
        links,
      });
    };

    return model()
      .call(
        [
          "linksByTopicId",
          { from: 0, to: 25 },
          [
            "id",
            "title",
            "url",
            "user_id",
            "user_name",
            "topic_id",
            "topic_title",
            "bias",
            "author_id",
            "news_agency_id",
            "content_type",
            "created_at",
          ],
        ],
        [topicId]
      )
      .then((response) => {
        // console.log('linksByTopicId', response.json);
        setTimeout(() => dispatch(response.json.latestLinks), 0);
      })
      .catch((why) => {
        // console.log('linksByTopicId/catch: ' + why);
      });
  },
};

export default LinkActions;
