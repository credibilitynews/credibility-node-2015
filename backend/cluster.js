var cluster = require('express-cluster');

cluster(function(worker){
    return require('./index');
}, {
    count: process.env.WEB_CONCURRENCY || 2,
    verbose: true,
    respawn: true
});
