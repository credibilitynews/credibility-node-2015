var jsx = require('node-jsx').install();
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var FalcorServer = require('falcor-express');
var RouterFactory = require('./router-factory');
var React = require('react/addons');
var APP = require('../frontend/src/js/app.js');

app.use(bodyParser.urlencoded({ extended: false }));
app.use('.', express.static('public'));

app.use('/model.json', FalcorServer.dataSourceRoute(function(req, res){
    return RouterFactory("1");
}));

//app.use('/public', express.static('./public'));
app.get('/public/*', function(req, res){
    res.sendFile(req.url, {root: "./backend"});
});
app.get('/*', function(req, res){
    var reactHtml = React.renderToString(React.createElement(APP, {url: req.url}));
    res.render('index.ejs', {reactOutput: reactHtml});
});

app.set('views', __dirname + '/views');

var server = app.listen(process.env.PORT || 5000, function(err){
    if(err){
        console.error(err);
        return;
    }
    console.log("navigate to http://localhost:"+(process.env.PORT || 5000));
});
