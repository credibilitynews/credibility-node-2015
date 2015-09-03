
var React = require('react');
var TopMenu = require('./menu/app-top-menu');
var UserMenu = require('./menu/app-user-menu');

var Header = React.createClass({
	render: function(){
		return (
			<nav className="header navbar navbar-default navbar-fixed-top" role="navigation">
				<div className="brand container-fluid">
					<div className="navbar-header">
						<button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse">
							<span className="sr-only">Toggle navigation</span>
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
						</button>
						<a className="navbar-logo">
						<span className="col-logo"><span className="logo">C</span></span>
						</a>
						<a className="navbar-brand" href="#/">
							<span className="col-brand">
							Credibility.io&nbsp;
							<small>Read both sides of the story</small>
							</span>
						</a>
					</div>

					<div className="collapse navbar-collapse" id="navbar-collapse">
						<UserMenu />
					</div>
				</div>
			</nav>
		)
	}
})

module.exports = Header;
