import Router from 'falcor-router';

var CredRouterBase = Router.createClass(
        [
        {
            // match a request for the key "greeting"
            route: 'greeting',
            // respond with a PathValue with the value of "Hello World."
            get: function() {
                return {path:['greeting'], value: 'Hello World'};
            }
        }
        ]
    .concat(require('./routes/links'))
    .concat(require('./routes/topics'))
    .concat(require('./routes/tags'))
    .concat(require('./routes/users'))
);

var CredRouter = function(userId) {
    CredRouterBase.call(this);
    this.userId = userId;
};
CredRouter.prototype = Object.create(CredRouterBase.prototype);
module.exports = function(userId) {
    return new CredRouter(userId);
};
