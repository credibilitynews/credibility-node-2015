import falcor from 'falcor';
import Promise from 'promise';
import AppDispatcher from 'dispatchers/app-dispatcher';
import HttpDataSource from 'falcor-http-datasource';

var _promises = {};
var _actions = [];
var _prepareForHydration = false;

function wrap(context, fn, cb){
    return function(){
        var promise = fn.apply(context, arguments);
        cb(promise);
        return promise;
    }.bind(context);
}

var FalcorModel = function(){
    var model;
    if(typeof window === 'undefined') {
        var userDoc = (typeof user === 'undefined') ? null : user;
        model = new falcor.Model({
            source: require('../../../backend/router-factory')(userDoc)
        });
    }else{
        model = new falcor.Model({source: new HttpDataSource('/model.json') });
    }

    ['get', 'getValue', 'set', 'setValue', 'call'].forEach(function(method){
        model[method] = wrap(model, model[method], function(promise){
            if(_prepareForHydration) _promises.push(promise);
        });
    });
    return model;
};

FalcorModel.prepareForHydration = function(){
    _prepareForHydration = true;
};

FalcorModel.hydrate = function(){
    var postHydrate = function(resolve){
        return function(){
            // wait for dispatcher actions
            var token = AppDispatcher.register(function(payload){
                AppDispatcher.waitForAll(token);
                AppDispatcher.unregister(token);
                //console.log('hydrated', _promises.length, 'promises');
                _promises = [];
                _prepareForHydration = false;
                resolve();
            });
        };
    };

    return new Promise(function (resolve, reject) {
        if(_promises.length == 0) return resolve();

        if(!_prepareForHydration)
            reject('Please make sure you have called prepareForHydration()');
        else Promise.all(_promises).then(postHydrate(resolve));
    });
};

FalcorModel.falcorize = function(Base, components, actions){
    return Base;
}

module.exports = FalcorModel;
