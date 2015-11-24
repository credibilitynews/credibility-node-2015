var falcor = require('falcor'),
    Promise = require('promise'),
    AppDispatcher = require('dispatchers/app-dispatcher');

var _promises = [];
var _prepareForHydration = false;

function wrap(context, fn, cb){
    return function(){
        var promise = fn.apply(context, arguments);
        cb(promise);
        return promise;
    }.bind(context);
}

var FalcorModel = function(){
    if(typeof window === 'undefined') {
        var userDoc = (typeof user === 'undefined') ? null : user;
        return new falcor.Model({
            source: require('../../../backend/router-factory')(userDoc)
        });
    }else{
        var HttpDataSource = require('falcor-http-datasource');
        var model = new falcor.Model({source: new HttpDataSource('/model.json') });

        ['get', 'getValue', 'set', 'setValue', 'call'].forEach(function(method){
            model[method] = wrap(model, model[method], function(promise){
                if(_prepareForHydration) _promises.push(promise);
            });
        });

        return model;
    }
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
        if(!_prepareForHydration)
            reject('Please make sure you have called prepareForHydration()');
         else Promise.all(_promises).then(postHydrate(resolve));
    });
};

module.exports = FalcorModel;
