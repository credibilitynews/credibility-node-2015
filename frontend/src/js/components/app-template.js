
var React = require('react');
var Header = require('./app-header.js');
var Footer = require('./app-footer.js');

var Template = React.createClass({
	render: function(){
		return (
			<div >
			    <Header />
				<div className="container-fluid">
					{this.props.children}
				</div>
			    <Footer />
			</div>
		)
	}
});

module.exports = Template;
