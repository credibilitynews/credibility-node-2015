/** @jsx React.DOM */
var React = require('react'),
	Link = require('react-router').Link;

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
			<div>
				<div>{this.props.meta.domain_name}</div>
				<div>{this.props.meta.author}</div>
				<div>{this.props.meta.created_at}</div>
				<div></div>
			</div>
		)
	}
});

module.exports = Story;
