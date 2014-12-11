/** @jsx React.DOM */
var React = require('react');
var Header = require('./app-header.js');
var Footer = require('./app-footer.js');
var Router = require('react-router'),
	RouteHandler = Router.RouteHandler;

var Template = React.createClass({
	render: function(){
		return (
			<div >
			    <Header />
				<div className="container">
				<RouteHandler />
				</div>
			    <Footer />
			</div>
		)
	}
});

module.exports = Template;
