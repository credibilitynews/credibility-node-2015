/** @jsx React.DOM */
var React = require('react');
var TopMenu = require('./menu/app-top-menu');
var UserMenu = require('./menu/app-user-menu');

var Header = React.createClass({
	render: function(){
		return (
			<div className="header col-md-12">
				<div className="brand container">
					<div className="row">
						<div className="col-sm-6">
							<a href="/"><h1>Credibility.io</h1></a>
							<small>Read both sides of the story</small>
						</div>
						<div className="col-sm-6 text-right">
							<div className="col-sm-12"><UserMenu /></div>
							<div className="col-sm-12"><TopMenu /></div>
						</div>
					</div>
				</div>
			</div>
		)
	}
})

module.exports = Header;
