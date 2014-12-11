/** @jsx React.DOM */
var React = require('react'),
	Link = require('react-router').Link;

var StoryLink = React.createClass({
	render: function(){
		path = "/story"
		return (
			<div className="story-link">
				<Link className="btn" to={path}>{this.props.title}</Link>
				<div>
					{this.props.meta.domain_name} {this.props.meta.author} {this.props.meta.created_at}
				</div>
				<div></div>
			</div>
		)
	}
});

module.exports = StoryLink;
