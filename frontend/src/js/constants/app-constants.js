import keyMirror from 'keymirror';

module.exports = {
    PayloadSources: keyMirror({
        SERVER_ACTION: null,
        VIEW_ACTION: null
    }),
    ActionTypes: keyMirror({
        FETCH_LATEST_LINKS: null,
        FETCH_TAG_LINKS: null,
        FETCH_TOPIC_LINKS: null,

        FETCH_LINKS: null,

        FETCH_RECENT_TOPICS: null,

        FETCH_USERS_BY_ID: null,

        FETCH_ALL_TAGS: null,
        FETCH_TOP_TAGS: null
    })
};
