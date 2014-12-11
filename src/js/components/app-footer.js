/** @jsx React.DOM */
var React = require('react');

var Footer = React.createClass({
	render: function(){
		return (
			<div className="footer">
				<div className="text-right container">
					<div className="copyright">some rights reserved</div>
				</div>
			</div>
		)
	}
})

module.exports = Footer;
