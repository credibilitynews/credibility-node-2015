/** @jsx React.DOM */
var React = require('react');
var TopMenu = require('./menu/app-top-menu');
var UserMenu = require('./menu/app-user-menu');

var Header = React.createClass({
	render: function(){
		return (
			<nav className="header navbar navbar-default navbar-fixed-top" role="navigation">
				<div className="brand container">
					<a href="/">
						<div className="navbar-brand">
							Credibility.io&nbsp;
							<small>Read both sides of the story</small>
						</div>
					</a>
					<UserMenu />
					<TopMenu />
				</div>
			</nav>
		)
	}
})

module.exports = Header;
