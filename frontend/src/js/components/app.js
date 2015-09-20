var React = require('react');

var Router = require('react-router-component'),
    Locations = Router.Locations,
    Location = Router.Location;

var Dashboard = require('components/dashboard/dashboard'),
    Topic = require('components/topic/topic'),
    Story = require('components/story/story'),
    Template =require('components/app-template');

var APP = React.createClass({
    render: function() {
        console.log('props', this.props);
        return (
            <Template>
                <Locations path={this.props.url}>
                    <Location path="/topic/:topicId" handler={Topic} />
                    <Location path="/story" handler={Story} />
                    <Location path="/(*)" handler={Dashboard} />
                </Locations>
            </Template>);
    }

});

module.exports = APP;
