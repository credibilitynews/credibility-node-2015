var model = require('falcor-model');

var ActionTypes = require('../constants/app-constants').ActionTypes,
    AppDispatcher = require('../dispatchers/app-dispatcher');

var TagActions = {
    fetchAllTags: function(){
        var fetchTagsWithLength = function(length){
            model()
            .get(['tags', {length: length}, ['id', 'name', 'code', 'parent_id']])
            .then(function(response){
                //console.log(response.json);
                AppDispatcher.handleServerAction({
                    actionType: ActionTypes.FETCH_ALL_TAGS,
                    tags: response.json.tags
                });
            }).catch(function(why){
                // console.log('tags', why);
            });
        };
        model()
        .get('tags.length')
        .then(function(response) {
            var length = response.json.tags.length;
            fetchTagsWithLength(length);
        }).catch(function(why){
            // console.log('tags.length', why);
        });
    },

    fetchTagsById: function(tagIds){
        model()
        .get(['tagsById', tagIds, ['name', 'code', 'parent_id']])
        .then(function(response) {
            //console.log(response.json);
        }).catch(function(why){
            // console.log('tagsById', why);
        });
    }
};

if(typeof window !== 'undefined') window.TagActions = TagActions;
module.exports = TagActions;
