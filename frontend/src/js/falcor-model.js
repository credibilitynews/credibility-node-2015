var falcor = require('falcor');

module.exports = function(){
    if(typeof window === 'undefined') {
        return new falcor.Model({
            source: require('../../../backend/router-factory')("1")
        });
    }else{
        var HttpDataSource = require('falcor-http-datasource');
        return new falcor.Model({source: new HttpDataSource('/model.json') });
    }
    return model;
}
