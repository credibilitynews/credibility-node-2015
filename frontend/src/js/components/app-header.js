
var React = require('react');
var TopMenu = require('./menu/app-top-menu');
var UserMenu = require('./menu/app-user-menu');

var Header = React.createClass({
	render: function(){
		return (
			<nav className="header navbar navbar-light navbar-fixed-top bg-faded" role="navigation">
				<div className="collapse navbar-toggleable-xs" id="CollapsingNavbar">
					{/*<a className="navbar-logo">
					<span className="col-logo"><span className="logo">C</span></span>
					</a>*/}
					<a className="navbar-brand" href="#/">
						<span className="col-brand">
						Credibility.io&nbsp;
						<small>Read both sides of the story</small>
						</span>
					</a>

					{/*<div className="collapse navbar-collapse" id="navbar-collapse">
						<UserMenu />
					</div>*/}
				</div>
			</nav>
		)
	}
})

module.exports = Header;
