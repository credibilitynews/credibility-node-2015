import AppDispatcher from '../dispatchers/app-dispatcher';
import {ActionTypes as ActionTypes} from '../constants/app-constants';

import assign from 'object-assign';
import Store from 'stores/app-store';

import Immutable from 'immutable';

var CHANGE_EVENT = 'categories-change';

var _categories = Immutable.OrderedMap();

function _addCategory(category){
    _categories = _categories.set(category.id.toString(), category);
}

function _addCategories(categories){
    Object.keys(categories).forEach(function(key){
        var category = categories[key];
        _addCategory(category);
    });
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
    dispatcherIndex: AppDispatcher.register(function(payload){
        var action = payload.action;
        switch(action.actionType){
        case ActionTypes.FETCH_ALL_TAGS:
            // console.log("store/category-store", payload.action.tags);
            _addCategories(payload.action.tags);
            CategoryStore.emitChange();
            break;
        }
        return true;
    })
});

module.exports = CategoryStore;
