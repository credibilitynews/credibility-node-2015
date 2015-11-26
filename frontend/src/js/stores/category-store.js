import AppDispatcher from '../dispatchers/app-dispatcher';
import {ActionTypes as ActionTypes} from '../constants/app-constants';

import assign from 'object-assign';
import Store from 'stores/app-store';

import Immutable from 'immutable';

var CHANGE_EVENT = 'categories-change';

var _categories = Immutable.OrderedMap();
var _topCategories = Immutable.OrderedMap();

function _addCategory(store, category){
    store = store.set(category.id, category);
    return store;
}

function _addCategories(store, categories){
    Object.keys(categories).map(function(key){
        var category = categories[key];
        store = _addCategory(store, category);
    });
    return store;
}

var CategoryStore = assign({}, Store, {
    events: {
        CHANGE_EVENT: CHANGE_EVENT
    },
    getCategory: function(categoryId){
        return _categories.get(categoryId.toString());
    },
    getAllCategories: function(){
        return _categories.toArray();
    },
    getTopCategories: function(){
        return _topCategories.toArray();
    },
    dispatcherIndex: AppDispatcher.register(function(payload){
        var action = payload.action;
        switch(action.actionType){
        case ActionTypes.FETCH_ALL_TAGS:
            // console.log("store/category-store", payload.action.tags);
            _categories = _addCategories(_categories, payload.action.tags);
            CategoryStore.emitChange();
            break;
        case ActionTypes.FETCH_TOP_TAGS:
            console.log("store/category-store", payload.action);
            _topCategories = _addCategories(_topCategories, payload.action.topTags);
            CategoryStore.emitChange();
            break;
        }
        return true;
    })
});

module.exports = CategoryStore;
