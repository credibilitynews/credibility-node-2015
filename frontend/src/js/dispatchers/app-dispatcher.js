var Dispatcher = require('flux').Dispatcher,
    assign = require('object-assign');

var PayloadSources = require('../constants/app-constants').PayloadSources;

Dispatcher.prototype = assign(Dispatcher.prototype, {
    handleViewAction: function(action){
        this.dispatch({
            source: PayloadSources.VIEW_ACTION,
            action: action
        });
    },
    handleServerAction: function(action){
        this.dispatch({
            source: PayloadSources.SERVER_ACTION,
            action: action
        });
    },
    waitForAll: function(myself){
        var tokens = this.getAllTokens().filter(function(token){
            return myself !== token;
        });
        return this.waitFor(tokens);
    },
    getAllTokens: function(){
        return Object.keys(this.$Dispatcher_callbacks);
    }
});

module.exports = new Dispatcher();
