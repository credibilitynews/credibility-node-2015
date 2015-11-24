import cluster from 'express-cluster';

cluster(function(worker){
    return require('./index');
}, {
    count: process.env.WEB_CONCURRENCY || 1,
    verbose: true,
    respawn: true
});
