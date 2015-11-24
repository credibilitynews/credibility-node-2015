import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';

import assign from 'object-assign';
import App from './components/app';

import FalcorModel from './falcor-model';

export default class ReactComponentRenderer {
    constructor(url, props) {
        this.url = url;
        this.props = props;

        this.renderToString = this.renderToString.bind(this);
        this.render = this.render.bind(this);
    }

    renderToString(cb){
        FalcorModel.prepareForHydration();

        FalcorModel
            .hydrate()
            .then(() => {
                var reactEl = React.createElement(App, assign({}, this.props, {url: this.url}));
                var html = ReactDOMServer.renderToString(reactEl);
                cb(html);
            })
            .catch((why)=>{
                console.error('ReactComponentRenderer#renderToString', why);
            });
    }

    render(container){
        FalcorModel.prepareForHydration();

        FalcorModel
            .hydrate()
            .then(() => {
                var reactEl = React.createElement(App, {url: this.url});
                ReactDOM.render(reactEl, container);
            })
            .catch((why)=>{
                console.error('ReactComponentRenderer#render', why);
            });

    }
}
