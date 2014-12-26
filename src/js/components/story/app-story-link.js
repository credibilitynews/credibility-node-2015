/** @jsx React.DOM */
var React = require('react'),
	Link = require('react-router').Link;

var StoryLink = React.createClass({
	render: function(){
		console.log("story-link", this.props);
		var story = this.props.story;

		return (
			<div className="story-link">
				<div className="info">
					<Link to={"/#/story/"+story.id}>
						{story.title}
					</Link>
					<div>
						<div className="domain_name">
							{story.domain_name}
						</div>
						<span className="created_at">
							{story.meta.created_time_ago}
						</span>
					</div>
				</div>
			</div>
		)
	}
});

module.exports = StoryLink;
