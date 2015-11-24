
var React = require('react'),
	Link = require('react-router-component').Link,
	LinkActions = require('../../actions/link-actions');

class StoryLink extends React.Component {
    render() {
		console.log("story-link", this.props);
		var story = this.props.story;

		return (
			<div className="story-link" data-created={story.meta.created_key}>
				<div className="info">
					<Link href={"/#/story/"+story.id} to={"/#/story/"+story.id}>
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
}

module.exports = StoryLink;
