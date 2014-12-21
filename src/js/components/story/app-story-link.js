/** @jsx React.DOM */
var React = require('react'),
	Link = require('react-router').Link;

var StoryLink = React.createClass({
	render: function(){
		path = "/story"
		return (
			<div className="story-link">
				<div>
					<Link to={path}>
						{this.props.title}
					</Link>
					<div>
						<span className="domain_name">
							{this.props.meta.domain_name}
						</span>
						<span className="author">
							{this.props.meta.author}
						</span>
						<span className="created_at">
							{this.props.meta.created_at}
						</span>
					</div>
				</div>
			</div>
		)
	}
});

module.exports = StoryLink;
