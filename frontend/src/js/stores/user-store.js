var Store = require('./app-store'),
    assign = require('object-assign'),
    Immutable = require('immutable'),

    ActionTypes = require('constants/app-constants').ActionTypes,
    AppDispatcher = require('dispatchers/app-dispatcher');

var CHANGE_EVENT = 'user-store-change',
    LOGIN_EVENT_SUCCESS = 'user-store-login-success',
    LOGIN_EVENT_ERROR = 'user-store-login-error';

var _users = Immutable.OrderedMap();

var UserStore = assign({}, Store, {
    events: {
        CHANGE_EVENT: CHANGE_EVENT,
        LOGIN_EVENT_SUCCESS: LOGIN_EVENT_SUCCESS,
        LOGIN_EVENT_ERROR: LOGIN_EVENT_ERROR
    },
    getUser: function(id){
        //var u = _users.get(id.toString());
        return _users.get(id.toString());
    },
    getDispatherToken: function(){
        return UserStore._dispatchToken;
    },
    _dispatchToken: AppDispatcher.register(function(payload){
        var action = payload.action;
        switch(action.actionType){
            // case ActionTypes.LOGIN:
            //     console.log(payload)
            //     if(data.token)
            //         this.emit(LOGIN_EVENT_SUCCESS, data.token);
            //     if(data.errors)
            //         this.emit(LOGIN_EVENT_ERROR, data.error);
            //     break;
        case ActionTypes.FETCH_USERS_BY_ID:
            _addUsers(action.users);
                //console.log(_users.toArray());
            UserStore.emitChange();
            break;
        default: break;
        }
    })
});

function _addUsers(users){
    Object.keys(users).forEach(function(key){
        _users = _users.set(key.toString(), users[key]);
    });
}

module.exports = UserStore;
