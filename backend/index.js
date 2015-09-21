var jsx = require('node-jsx').install();
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var FalcorServer = require('falcor-express');
var RouterFactory = require('./router-factory');
var React = require('react/addons');
var flash = require('connect-flash');
var enforce = require('express-sslify');
var passwordless = require('./auth/passwordless');
var pg = require('pg');
var session = require('express-session');
var pgSession = require('connect-pg-simple')(session);
var expressValidator = require('express-validator');

var account = require('./routes/account');
var APP = require('../frontend/src/js/components/app.js');

app.use(session({
  store: new pgSession({
    pg : pg,                                  // Use global pg-module
    conString : process.env.DATABASE_URL, // Connect using something else than default DATABASE_URL env variable
    tableName : 'user_sessions'               // Use another table-name than the default "session" one
  }),
  secret: process.env.COOKIE_SECRET,
  cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 } // 30 days
}));

app.use(flash());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use('.', express.static('public'));
passwordless(app);

app.use(expressValidator({
    customSanitizers: {
        toLowerCase: function(str) {
            return str.toLowerCase();
        },
    }
}));

app.use('/account', account);
app.use('/model.json', FalcorServer.dataSourceRoute(function(req, res){
    //console.log('/model.json', req.query);
    return RouterFactory("1");
}));

app.get('/favicon.ico', function(req, res){
    res.sendFile('favicon.ico', {root: './backend/public'})
});

app.get('/public/*', function(req, res){
    res.sendFile(req.url, {root: "./backend"});
});

app.get('*', function(req, res){
    var validation = req.flash('validation')[0],
        error = req.flash('passwordless')[0],
        success = req.flash('passwordless-success')[0];

    var reactEl = React.createElement(APP, {
        url: req.url,
        user: res.locals ? res.locals.user : null,
        validation: validation,
        error: error,
        success: success
    });

    var reactHtml = React.renderToString(reactEl);
    res.render('index.ejs', {
        reactOutput: reactHtml,
        user: res.locals ? res.locals.user : null,
        validation: validation,
        error: error,
        success: success
    });
});

app.set('views', __dirname + '/views');

module.export = app.listen(process.env.PORT || 5000, function(err){
    if(err){
        console.error(err);
        return;
    }
    console.log("navigate to "+process.env.CREDIBILITY_URL+":"+(process.env.PORT || 5000));
});
