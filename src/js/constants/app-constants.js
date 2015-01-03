var keyMirror = require('react/lib/keyMirror');

module.exports = {
    PayloadSources: keyMirror({
        SERVER_ACTION: null,
        VIEW_ACTION: null
    }),
    ActionTypes: keyMirror({
        RECEIVE_LAYOUT: null,
        RECEIVE_TOPIC: null,
        ADD_TOPIC: null
    })
}
