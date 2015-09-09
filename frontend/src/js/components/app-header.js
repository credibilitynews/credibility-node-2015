var React = require('react');
var TopMenu = require('./menu/top-menu');
var UserMenu = require('./menu/user-menu');

var Header = React.createClass({
	render: function(){
		return (
			<nav className="header navbar navbar-light bg-faded" role="navigation">
				<a className="navbar-brand" href="#/">
					<span className="col-brand">Credibility.io</span>
				</a>
			</nav>
		)
	}
})

module.exports = Header;
