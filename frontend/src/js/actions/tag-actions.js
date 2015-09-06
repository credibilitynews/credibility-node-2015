var model = require('falcor-model');

var ActionTypes = require('../constants/app-constants').ActionTypes,
    AppDispatcher = require('../dispatchers/app-dispatcher');

var request = function(){
    return require('superagent');
};
var TagActions = {
    fetchAllTags: function(){
        model
        .get("tags.length")
        .then(function(response) {
            console.log(response.json);
        }).catch(function(why){console.log(why)});
    },
    fetchTagsById: function(tagIds){
        model
        .get(["tagsById", tagIds, ["name", "code", "parent_id"]])
        .then(function(response) {
            console.log(response.json);

        }).catch(function(why){console.log(why)});
    }
};

if(typeof window !== "undefined") window.TagActions = TagActions;
module.exports = TagActions;
