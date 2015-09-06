var AppDispatcher = require('../dispatchers/app-dispatcher'),
    ActionTypes = require('../constants/app-constants').ActionTypes;

var assign = require('object-assign'),
    Store = require('stores/app-store'),

    Immutable = require('immutable');

var CHANGE_EVENT = "categories-change";

var _categories = Immutable.List();

function _addCategory(category){
    _categories.push(category);
}

function _addCategories(categories){
    _categories = _categories.concat(categories);
}

var CategoryStore = assign({}, Store, {
    events: {
        CHANGE_EVENT: "app-category-store"
    },
    getCategory: function(categoryId){
        return _categories
        .reduce(function(selected, item){
            if(categoryId == item.id){
                return item;
            }else{
                return selected;
            }
        }, null);
    },
    getAllCategories: function(){
        return _categories;
    },
    dispatcherIndex: AppDispatcher.register(function(payload){
        var action = payload.action;
        // switch(action.actionType){
        //     case ActionTypes.RECEIVE_LAYOUT:
        //         //console.log("store/category-store", payload.action.layout.categories);
        //         _addCategories(payload.action.layout.categories);
        //         break;
        //     case ActionTypes.ADD_TOPIC:
        //         _addCategories(payload.action.topic)
        //         break;
        // }
        // CategoryStore.emitChange();
        return true;
    })
})

module.exports = CategoryStore;
