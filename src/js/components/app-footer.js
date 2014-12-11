/** @jsx React.DOM */
var React = require('react');

var Footer = React.createClass({
	render: function(){
		return (
			<footer className="footer">
				<div className="text-right container">
					<div className="copyright">some rights reserved</div>
				</div>
			</footer>
		)
	}
})

module.exports = Footer;
