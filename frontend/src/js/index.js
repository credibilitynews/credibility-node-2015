var React = require('react'),
    APP = require('./components/app');

if(typeof window !== "undefined") 
    React.render(<APP />, document.querySelector('#credibility'));
