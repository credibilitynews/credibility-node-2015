/** @jsx React.DOM */
var React = require('react');

var Router = require('react-router'),
    Route = Router.Route,
    DefaultRoute = Router.DefaultRoute;

var Dashboard = require('./dashboard/app-dashboard'),
    Topic = require('./topic/app-topic'),
    Story = require('./story/app-story'),
    Template =require('./app-template');

var routes = (
    <Route handler={Template}>
        <DefaultRoute handler={Dashboard} />
        <Route name="topic" handler={Topic} />
        <Route name="story" handler={Story} />
    </Route>
);

Router.run(routes, function (Handler) {
    React.render(<Handler/>, document.body);
});
