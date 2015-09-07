var keyMirror = require('react/lib/keyMirror');

module.exports = {
    PayloadSources: keyMirror({
        SERVER_ACTION: null,
        VIEW_ACTION: null
    }),
    ActionTypes: keyMirror({
        FETCH_LATEST_LINKS: null,

        FETCH_TOPICS_BY_ID: null,
        FETCH_RECENT_TOPICS: null,

        FETCH_USERS_BY_ID: null
    })
}
