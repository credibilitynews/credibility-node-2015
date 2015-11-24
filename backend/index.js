"use strict";

import express from 'express';
import bodyParser from 'body-parser';

import FalcorServer from 'falcor-express';
import RouterFactory from './router-factory';
import React from 'react';
import flash from 'connect-flash';
import enforce from 'express-sslify';
import passwordless from './auth/passwordless';
import pg from 'pg';
import session from 'express-session';
import expressValidator from 'express-validator';

import account from './routes/account';
import APP from '../frontend/src/js/components/app.js';

var pgSession = require('connect-pg-simple')(session);
var jsx = require('node-jsx').install();
var app = express();

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
