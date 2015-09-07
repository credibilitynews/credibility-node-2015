var React = require('react');
var TopMenu = require('./menu/app-top-menu');
var UserMenu = require('./menu/app-user-menu');

var Header = React.createClass({
	render: function(){
		return (
			<nav className="header navbar navbar-light navbar-fixed-top bg-faded" role="navigation">
				<a className="navbar-brand" href="#/">
					<span className="col-brand">Credibility.io</span>
				</a>
			</nav>
		)
	}
})

module.exports = Header;
