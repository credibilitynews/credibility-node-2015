var keyMirror = require('react/lib/keyMirror');

module.exports = {
    PayloadSources: keyMirror({
        SERVER_ACTION: null,
        VIEW_ACTION: null
    }),
    ActionTypes: keyMirror({
        RECEIVE_LAYOUT: null,
        ADD_TOPIC: null
    })
}
