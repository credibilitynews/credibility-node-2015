var falcor = require('falcor'),
    HttpDataSource = require('falcor-http-datasource'),
    model = new falcor.Model({source: new HttpDataSource('/model.json') });

var ActionTypes = require('../constants/app-constants').ActionTypes,
    AppDispatcher = require('../dispatchers/app-dispatcher');

var request = function(){
    return require('superagent');
};
var TagActions = {
    fetchAllTags: function(){
        var fetchAll = function(max){
            model
            .get("tags[0.."+max+"]['id']")
            .then(function(response) {
                console.log(response.json);
                document.write('response: '+response.json);
            }).catch(function(why){console.log(why)});
        };
        model
        .get("tags.length")
        .then(function(response) {
            console.log(response.json);
            document.write('response: '+response.json);
            var max = parseInt(response.json.tags.length) -1;
            fetchAll(max);
        }).catch(function(why){console.log(why)});
    },
    fetchTagsById: function(tagIds){
        model
        .get(["tagsById", tagIds, ["name", "code", "parent_id"]])
        .then(function(response) {
            console.log(response.json);
            document.write('response: '+response.json);
        }).catch(function(why){console.log(why)});
    }
};

if(typeof window !== "undefined") window.TagActions = TagActions;
module.exports = TagActions;
