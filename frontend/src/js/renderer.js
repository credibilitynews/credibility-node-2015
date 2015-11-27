import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';

import assign from 'object-assign';
import App from './components/app';
import Promise from 'promise';

import FalcorModel from './falcor-model';
import UrlPattern from 'url-pattern';

import {preFetchDataAction, destructPreFetchable} from 'pre-fetchable';

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
                if(typeof process !== 'undefined'){
                    process.stdout.write(
                        `catch/#renderToString: ` + why.stack);
                }
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
                // console.log(`catch/#render: ` + why.stack);
            });
        };
        Promise.all([this.preFetchDataforRoute(this.url)]).then(hydrate);

    }

    preFetchDataforRoute(path){

        let routes = {
            topic: new UrlPattern('/topics/:topicId/:slug'),
            story: new UrlPattern('/stories/:storyId/:slug'),
            tag: new UrlPattern('/tags/:tagId/:slug')
        };
        var parts;

        if(routes.topic.match(path)){
            parts = routes.topic.match(path);
            var Topic = require('components/topic/topic');
            return preFetchDataAction(Topic)(parts.topicId);
        }
        var promises = [];
        if(routes.story.match(path)){
            parts = routes.story.match(path);
            var Story = require('components/story/story');
            promises.push(preFetchDataAction(Story)(parts.storyId));
        }


        if(routes.tag.match(path)){
            parts = routes.tag.match(path);
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
