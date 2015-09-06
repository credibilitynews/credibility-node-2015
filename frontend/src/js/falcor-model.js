var falcor = require('falcor'),
    HttpDataSource = require('falcor-http-datasource');
var model = new falcor.Model({source: new HttpDataSource('/model.json') });

if(typeof window === 'undefined') {
    model = new falcor.Model({
            source: require('../../../backend/router-factory')("1")
    });
}

module.exports = model;
