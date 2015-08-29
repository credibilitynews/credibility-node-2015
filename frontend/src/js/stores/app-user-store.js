var Store = require('./app-store'),
    assign = require('object.assign'),
    AppDispatcher = require('../dispatchers/app-dispatcher');

var CHANGE_EVENT = 'user-store-change',
    LOGIN_EVENT_SUCCESS = 'user-store-login-success',
    LOGIN_EVENT_ERROR = 'user-store-login-error';


var UserStore = assign({}, Store, {
    events: {
        CHANGE_EVENT: CHANGE_EVENT,
        LOGIN_EVENT_SUCCESS: LOGIN_EVENT_SUCCESS,
        LOGIN_EVENT_ERROR: LOGIN_EVENT_ERROR
    },
    getDispatherToken: function(){
        return _dispatchToken;
    },
    payloadHandler: function(payload){
        var action = payload.action;
        switch(action.actionType){
            case ActionTypes.LOGIN:
                console.log(payload)
                if(data.token)
                    this.emit(LOGIN_EVENT_SUCCESS, data.token);
                if(data.errors)
                    this.emit(LOGIN_EVENT_ERROR, data.error);
                break;
        }
    }
}),  _dispatchToken = AppDispatcher.register(UserStore.payloadHandler);

module.exports = UserStore;
