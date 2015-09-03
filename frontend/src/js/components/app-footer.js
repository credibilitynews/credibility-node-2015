
var React = require('react');

var Footer = React.createClass({
	render: function(){
		return (
			<footer className="footer">
				<div className="text-right container-fluid">
					<div className="copyright">some rights reserved</div>
				</div>
			</footer>
		)
	}
})

module.exports = Footer;
