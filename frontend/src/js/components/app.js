'use strict';
import React from 'react';

import {Locations, Location, NotFound} from 'react-router-component';

import Dashboard from 'components/dashboard/dashboard';
import Topic from 'components/topic/topic';
import Story from 'components/story/story';
import Template from 'components/app-template';
import AppLogin from 'components/user/user-login';
import Post from 'components/post/post';

const tap = (tapped, cb) => {
    return function(...args){
        let res = tapped(...args);
        cb(...args);
        return res;
    };
};

class App extends React.Component {
    constructor(props, context){
        super(props, context);
        this._handleUrlChange = this._handleUrlChange.bind(this);

        this.state = {
            url: props.url
        };
    }

    componentWillMount(){
        if(typeof window !== 'undefined'){
            window.history.pushState = tap(
                window.history.pushState.bind(window.history),
                this._handleUrlChange);
        }
    }

    render() {
        return (
            <Template user={this.props.user}>
                <Locations path={this.state.url}>
                    <Location path="/post" handler={Post} {...this.props}/>
                    <Location path="/account/login" handler={AppLogin} {...this.props}/>
                    <Location path="/topics/:topicId/:slug" handler={Topic} />
                    <Location path="/links/:linkId/:slug" handler={Story} />
                    <NotFound handler={Dashboard} {...this.state}/>
                </Locations>
            </Template>);
    }

    _handleUrlChange (...args){
        this.setState({url: args[2]});
    }
}

import {preFetchable, preFetchDataAction, preFetchableDestructor} from 'pre-fetchable';
const children = [AppLogin, Topic, Story, Dashboard];

module.exports = preFetchable(
    App,
    preFetchDataAction(...children),
    preFetchableDestructor(App, ...children)
);
