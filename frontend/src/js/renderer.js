import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';

import assign from 'object-assign';
import App from './components/app';
import Promise from 'promise';

import FalcorModel from './falcor-model';
import UrlPattern from 'url-pattern';

import {preFetchDataAction, destructPreFetchable} from 'pre-fetchable';

// var App = React.createFactory(require('./components/App'))

export default class ReactComponentRenderer {
    constructor(url, props) {
        this.url = url;
        this.props = props;

        this.renderToString = this.renderToString.bind(this);
        this.render = this.render.bind(this);
        this.reactEl = React.createElement(App, assign({}, this.props, {url: this.url}));
    }

    renderToString(cb){
        // console.log('ReactComponentRenderer#renderToString');
        FalcorModel.prepareForHydration();

        let hydrate = () => {
            FalcorModel
            .hydrate()
            .then(() => {
                // console.log('>>> hydrated');
                destructPreFetchable(App);

                var html = ReactDOMServer.renderToString(this.reactEl);
                cb(html);
            })
            .catch((why)=>{
                // console.log('ReactComponentRenderer#renderToString', why);
            });
        };

        Promise.all([this.preFetchDataforRoute(this.url)]).then(hydrate);
    }

    render(container){
        // console.log('>>> ReactComponentRenderer#render');

        FalcorModel.prepareForHydration();
        let hydrate = () => {
            FalcorModel
            .hydrate()
            .then(() => {
                // console.log('>>> hydrated');
                destructPreFetchable(App);

                ReactDOM.render(this.reactEl, container);
            })
            .catch((why)=>{
                // console.log('ReactComponentRenderer#render', why);
            });
        };
        Promise.all([this.preFetchDataforRoute(this.url)]).then(hydrate);

    }

    preFetchDataforRoute(path){

        let routes = {
            topic: new UrlPattern('/topic/:topicId/:slug'),
            story: new UrlPattern('/link/:linkId/:slug'),
            tag: new UrlPattern('/tags/:tagId/:slug')
        };

        if(routes.topic.match(path)){
            var Topic = require('components/topic/topic');
            return preFetchDataAction(Topic)();
        }
        if(routes.story.match(path)){
            var Story = require('components/story/story');
            return preFetchDataAction(Story)();
        }

        var promises = [];
        if(routes.tag.match(path)){
            var parts = routes.tag.match(path);
            var TaggedList = require('components/tag/list');
            promises.push(preFetchDataAction(TaggedList)(parts.tagId));
        }else{
            var ActivityList = require('components/activity/activity-list');
            promises.push(preFetchDataAction(ActivityList)());
        }

        var Dashboard = require('components/dashboard/dashboard');
        promises.push(preFetchDataAction(Dashboard)());

        return Promise.all(promises);
    }
}
