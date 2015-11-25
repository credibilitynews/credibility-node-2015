import falcor from 'falcor';
import Promise from 'promise';
import AppDispatcher from 'dispatchers/app-dispatcher';
import HttpDataSource from 'falcor-http-datasource';

var _promises = [];
var _prepareForHydration = false;

function tap(context, fn, cb){
    return function(){
        var promise = fn.apply(context, arguments);
        cb(promise);
        return promise;
    }.bind(context);
}

var _model;
var FalcorModel = function(){

    if(!_model && typeof window === 'undefined') {
        var userDoc = (typeof user === 'undefined') ? null : user;
        _model = new falcor.Model({
            source: require('../../../backend/router-factory')(userDoc)
        });
    }else if(!_model){
        _model = new falcor.Model({source: new HttpDataSource('/model.json') });
    }

    if(_prepareForHydration)
        ['get', 'getValue', 'set', 'setValue', 'call'].forEach(function(method){
            _model[method] = tap(_model, _model[method], function(promise){
                if(_prepareForHydration) _promises.push(promise);

                Promise.all([promise])
                .then(() => {
                    // console.log('done model#'+method);
                    _promises.splice(_promises.indexOf(promise), 1);
                })
                .catch((why) => {
                    // console.log('error model#'+method, why);
                    _promises.splice(_promises.indexOf(promise), 1);
                });
            });
        });

    return _model;
};

var _dispatcherToken;
FalcorModel.prepareForHydration = function(){
    _prepareForHydration = true;
    _dispatcherToken = AppDispatcher.register((payload) => {
        // console.log('waitForAll', payload.action);
        AppDispatcher.waitForAll(token);
    });
};


FalcorModel.hydrate = function(){

    var postHydrate = function(resolve){
        return () => {
            // console.log('postHydrate');
            AppDispatcher.unregister(_dispatcherToken);

            _dispatcherToken = null;
            _model = null;
            _promises = [];
            _prepareForHydration = false;
            // console.log('postHydrate#resolve');
            resolve();
        };
    };

    return new Promise(function (resolve, reject) {
        // console.log('hydrate', _promises.length);
        if(_promises.length == 0) return resolve();

        if(!_prepareForHydration)
            reject('Please make sure you have called prepareForHydration()');
        else Promise.all(_promises).then(postHydrate(resolve));
    });
};

module.exports = FalcorModel;
