
var React = require('react');
var Header = require('./app-header.js');
var Footer = require('./app-footer.js');

var Template = React.createClass({
	render: function(){

		var user_details = typeof user === "undefined" && !this.props.user ?
			null : (this.props.user || user);
		console.log(user_details, this.props);	
		return (
			<div>
			    <Header user={user_details}/>
				<div className="container-fluid content">
					{this.props.children}
				</div>
			    <Footer />
			</div>
		)
	}
});

module.exports = Template;
