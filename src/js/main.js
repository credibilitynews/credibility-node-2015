/** @jsx React.DOM */
var React = require('react');

var Router = require('react-router-component'),
    Locations = React.createFactory(Router.Locations),
    Location = React.createFactory(Router.Location);

var Dashboard = require('./components/dashboard/app-dashboard'),
    Topic = require('./components/topic/app-topic'),
    Story = require('./components/story/app-story'),
    Template =require('./components/app-template');

var APP = React.createClass({
    render: function() {
        return (
            <Template>
                <Locations hash>
                    <Location path="/" handler={Dashboard} />
                    <Location path="/topic/:topicId" handler={Topic} />
                    <Location path="/story" handler={Story} />
                </Locations>
            </Template>
        );
    }

});

React.render(<APP />, document.body);
