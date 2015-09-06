var Dispatcher = require("flux").Dispatcher,
    assign = require("object-assign");

var PayloadSources = require('../constants/app-constants').PayloadSources;

Dispatcher.prototype = assign(Dispatcher.prototype, {
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

module.exports = new Dispatcher();
