var React = require('react');

var ReactDOM = require('react-dom');

if(typeof window !== 'undefined') {
    var FalcorModel = require('./falcor-model');
    FalcorModel.prepareForHydration();

    var APP = require('./components/app');
    FalcorModel
        .hydrate()
        .then(function(){
            ReactDOM.render(<APP />, document.querySelector('#credibility'));
        });
}
