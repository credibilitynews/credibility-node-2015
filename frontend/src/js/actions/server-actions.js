import { ActionTypes } from '../constants/app-constants';
import AppDispatcher from '../dispatchers/app-dispatcher';
import jsonp from '../jsonp';

const request = function () {
  return require('superagent');
};
const ServerActions = {
  addTopic(topic) {
    AppDispatcher.handleViewAction({
      actionType: ActionTypes.ADD_TOPIC,
      topic,
    });
  },
  addLink(link) {
    AppDispatcher.handleViewAction({
      actionType: ActionTypes.ADD_LINK,
      link,
    });
  },
  fetchTagTweets(tags) {
    if (typeof document !== 'undefined') {
      request()
        .get('https://api.twitter.com/1.1/search/tweets.json?q=euromaiden')
        .use(jsonp)
        .end((err, res) => {
        // console.log(arguments);
        });
    }
  },
};
export default ServerActions;
