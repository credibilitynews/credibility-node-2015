import {Dispatcher} from 'flux';
import assign from 'object-assign';

import {PayloadSources as PayloadSources} from '../constants/app-constants';

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
        // console.log(this);
        return Object.keys(this._callbacks);
    }
});

module.exports = new Dispatcher();
