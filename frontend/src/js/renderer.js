import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';

import assign from 'object-assign';
import App from './components/app';

// import ReactUpdates from 'react/lib/ReactUpdates';
// console.log(ReactUpdates.asap);

export default class ReactComponentRenderer {
    constructor(url, props) {
        this.url = url;
        this.props = props;

        this.renderToString = this.renderToString.bind(this);
        this.render = this.render.bind(this);
    }

    renderToString(cb){
        var FalcorModel = require('./falcor-model');
        FalcorModel.prepareForHydration();

        FalcorModel
            .hydrate()
            .then(() => {
                var reactEl = React.createElement(App, assign({}, this.props, {url: this.url}));
                var html = ReactDOMServer.renderToString(reactEl);
                cb(html);
            })
            .catch((why)=>{
                console.error('renderToString', why);
            });
    }

    render(container){
        var FalcorModel = require('./falcor-model');
        FalcorModel.prepareForHydration();

        FalcorModel
            .hydrate()
            .then(() => {
                var reactEl = React.createElement(App, {url: this.url});
                ReactDOM.render(reactEl, container);
            })
            .catch((why)=>{
                console.error('renderToString', why);
            });

    }
}
