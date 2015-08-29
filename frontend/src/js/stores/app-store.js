var EventEmitter = require('events').EventEmitter;
var assign = require('object.assign');

var Store =  assign({}, EventEmitter.prototype, {
    addChangeListener: function(listener){
        this.addListener(this.events.CHANGE_EVENT, listener);
    },
    removeChangeListener: function(listener){
        this.removeListener(this.events.CHANGE_EVENT, listener);
    },
    emitChange: function(){
        this.emit(this.events.CHANGE_EVENT);
    }
});

module.exports = Store;
