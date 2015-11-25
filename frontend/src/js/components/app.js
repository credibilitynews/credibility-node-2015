'use strict';
import React from 'react';

import {Locations, Location} from 'react-router-component';

import Dashboard from 'components/dashboard/dashboard';
import Topic from 'components/topic/topic';
import Story from 'components/story/story';
import Template from 'components/app-template';
import AppLogin from 'components/user/user-login';

class App extends React.Component {
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

import {preFetchable, preFetchDataAction, preFetchableDestructor} from 'pre-fetchable';
const children = [AppLogin, Topic, Story, Dashboard];

module.exports = preFetchable(
    App,
    preFetchDataAction(...children),
    preFetchableDestructor(App, ...children)
);
