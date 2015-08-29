var falcor = require('falcor'),
    HttpDataSource = require('falcor-http-datasource'),
    model = new falcor.Model({source: new HttpDataSource('/model.json') });

var ActionTypes = require('../constants/app-constants').ActionTypes,
    AppDispatcher = require('../dispatchers/app-dispatcher');

var request = function(){
    return require('superagent');
};
var TagActions = {
    fetchTags: function(){
        model
        .get("tagsById[1,2,3]['name','code']")
        .then(function(response) {
            console.log(response.json);
            document.write('response: '+response.json);
        }).catch(function(why){console.log(why)});
    }
};

if(typeof window !== "undefined") window.TagActions = TagActions;
module.exports = TagActions;
