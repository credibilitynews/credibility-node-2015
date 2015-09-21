var React = require('react');

if(typeof window !== "undefined") {
    var FalcorModel = require('./falcor-model');
    FalcorModel.prepareForHydration();
    
    var APP = require('./components/app');
    FalcorModel
        .hydrate()
        .then(function(){
            React.render(<APP />, document.querySelector('#credibility'));
        });
}
