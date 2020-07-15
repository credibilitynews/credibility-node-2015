const Router = require("falcor-router");
const links = require("./routes/links");
const topics = require("./routes/topics");
const tags = require("./routes/tags");
const users = require("./routes/users");

var CredRouterBase = Router.createClass(
  [
    {
      // match a request for the key "greeting"
      route: "greeting",
      // respond with a PathValue with the value of "Hello World."
      get: function () {
        return { path: ["greeting"], value: "Hello World" };
      },
    },
  ]
    .concat(links)
    .concat(topics)
    .concat(tags)
    .concat(users)
);

var CredRouter = function (userId) {
  CredRouterBase.call(this);
  this.userId = userId;
};
CredRouter.prototype = Object.create(CredRouterBase.prototype);
module.exports = function (userId) {
  return new CredRouter(userId);
};
