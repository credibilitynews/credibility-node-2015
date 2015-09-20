var AppDispatcher = require('../dispatchers/app-dispatcher'),
    ActionTypes = require('../constants/app-constants').ActionTypes;

var assign = require('object-assign'),
    Store = require('stores/app-store'),

    Immutable = require('immutable');

var CHANGE_EVENT = "categories-change";

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
        CHANGE_EVENT: "category-store"
    },
    getCategory: function(categoryId){
        return _categories.get(categoryId.toString())
    },
    getAllCategories: function(){
        return _categories.toArray();
    },
    dispatcherIndex: AppDispatcher.register(function(payload){
        var action = payload.action;
        switch(action.actionType){
            case ActionTypes.FETCH_ALL_TAGS:
                //console.log("store/category-store", payload.action.tags);
                _addCategories(payload.action.tags);
                CategoryStore.emitChange();
                break;
        }
        return true;
    })
})

module.exports = CategoryStore;
