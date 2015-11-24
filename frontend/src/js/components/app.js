'use strict';
var React = require('react');

var Router = require('react-router-component'),
    Locations = Router.Locations,
    Location = Router.Location;

var Dashboard = require('components/dashboard/dashboard'),
    Topic = require('components/topic/topic'),
    Story = require('components/story/story'),
    Template = require('components/app-template'),
    AppLogin = require('components/user/user-login');

class APP extends React.Component {

    render() {
        return (
            <Template user={this.props.user}>
                <Locations path={this.props.url}>
                    <Location path="/account/login" handler={AppLogin} {...this.props}/>
                    <Location path="/topic/:topicId" handler={Topic} />
                    <Location path="/story" handler={Story} />
                    <Location path="/(*)" handler={Dashboard} />
                </Locations>
            </Template>);
    }
}

module.exports = APP;
