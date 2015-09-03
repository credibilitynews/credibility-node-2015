
var React = require('react');

var Story = React.createClass({
	getDefaultProps: function() {
		return {
			meta: {
				domain_name: "credibility.io",
				author: "admin",
				created_at: "2013-01-01"
			}
		};
	},
	render: function(){
		return (
			<div className="panel">
				<div className="panel-body">
					<div>{this.props.meta.domain_name}</div>
					<div>{this.props.meta.author}</div>
					<div>{this.props.meta.created_at}</div>
				</div>
			</div>
		)
	}
});

module.exports = Story;
