var Dispatcher = require("./dispatcher"),
    merge = require("object-assign");

var PayloadSources = require('../constants/app-constants').PayloadSources;

var AppDispatcher = merge(Dispatcher.prototype, {
    handleViewAction: function(action){
        this.dispatch({
            source: PayloadSources.VIEW_ACTION,
            action: action
        })
    },
    handleServerAction: function(action){
        this.dispatch({
            source: PayloadSources.SERVER_ACTION,
            action: action
        });
    }
});

module.exports = AppDispatcher;
