import invariant from 'invariant';

export function preFetchable(Base, fetch, destructor){
    Base.__prefetchData = function(...args){
        var promise = fetch(...args);
        invariant(promise && typeof promise.then === 'function',
            Base.name+'#'+fetch.name, 'does not return a promise');
        return promise;
    };
    Base.__destructPrefetchable = destructor || function(){};
    return Base;
}

export function destructPreFetchable(component){
    // console.log(component.name+'.__destructPrefetchable? ',  !!component.__destructPrefetchable);
    if(component.__destructPrefetchable){
        // console.log(component.name+'.__destructPrefetchable();');
        component.__destructPrefetchable();
        delete component.__destructPrefetchable;
    }
}

export function preFetchableDestructor(...components){
    // console.log(components.length);
    return function(){
        components.forEach((item) => {
            // console.log(item.name+'.__prefetchData?', !!item.__prefetchData);
            if(item.__prefetchData){
                // console.log(item.name+'.__prefetchData = null;');
                item.__prefetchData = null;
                delete item.__prefetchData;
                module.exports.destructPreFetchable(item);
            }
        });
    };
}

export function preFetchDataAction(...components){
    return function(...args){
        let promises = [];
        components.forEach((item) => {
            if(item.__prefetchData){
                // console.log(item.name+'.__prefetchData()');
                promises.push(item.__prefetchData(...args));
            }
        });
        return Promise.all(promises);
    };
}

export function combine(...args){
    return function(){
        args.forEach((fn)=>{
            fn();
        });
    };
}
