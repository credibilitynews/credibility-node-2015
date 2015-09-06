var React = require('react');

var Router = require('react-router-component'),
    Locations = Router.Locations,
    Location = Router.Location;

var Dashboard = require('components/dashboard/app-dashboard'),
    Topic = require('components/topic/app-topic'),
    Story = require('components/story/app-story'),
    Template =require('components/app-template');

var APP = React.createClass({
    render: function() {
        return (
            <Template>
                <Locations hash path={this.props.url}>
                    <Location path="/topic/:topicId" handler={Topic} />
                    <Location path="/story" handler={Story} />
                    <Location path="/(*)" handler={Dashboard} />
                </Locations>
            </Template>);
    }

});

module.exports = APP;
