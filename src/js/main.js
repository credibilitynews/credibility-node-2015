/** @jsx React.DOM */
var React = require('react');

var Router = require('react-router'),
    Route = Router.Route,
    DefaultRoute = Router.DefaultRoute;

var Dashboard = require('./components/dashboard/app-dashboard'),
    Topic = require('./components/topic/app-topic'),
    Story = require('./components/story/app-story'),
    Template =require('./components/app-template');

var routes = (
    <Route name="app" path="/" handler={Template}>
        <DefaultRoute handler={Dashboard} />
        <Route path="/topic/:topicId" handler={Topic} />
        <Route name="story" handler={Story} />
    </Route>
);

Router.run(routes, function (Handler) {
    React.render(<Handler />, document.body);
});
