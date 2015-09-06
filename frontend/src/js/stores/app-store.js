var assign = require('object-assign');
var EventEmitter = require('events').EventEmitter;

var AppStore = assign({}, EventEmitter.prototype, {
    emitChange: function(data){
        if(!this.events.CHANGE_EVENT) throw new Error('CHANGE_EVENT not defined');
        this.emit(this.events.CHANGE_EVENT, data);
    },
    addChangeListener: function(handler){
        if(!this.events.CHANGE_EVENT) throw new Error('CHANGE_EVENT not defined');
        this.addListener(this.events.CHANGE_EVENT, handler)
    },
    removeChangeListener: function(handler){
        if(!this.events.CHANGE_EVENT) throw new Error('CHANGE_EVENT not defined');
        this.removeListener(this.events.CHANGE_EVENT, handler)
    }
});

module.exports = AppStore;
