/** @jsx React.DOM */
var React = require('react');
var Hashtag = require('../tag/app-hashtag');
var StoryList = require('../story/app-story-list');
var Score = require('../stats/app-score');
var TopicStats = require('../stats/app-topic-stats');

var Router = require('react-router');
var TopicStore = require('../../stores/app-topic-store');

var Topic = React.createClass({
	mixins: [Router.State],
	getDefaultProps: defaultProps,

	componentWillMount: function() {
		var topicId = parseInt(this.getParams().topicId);
		this.props.topic = TopicStore.getTopic(topicId);
	},
	componentDidMount: function() {
		if(this.topic){
			this.props.topic = topic;
		}
	},
	render: function(){
		console.log('topic', this.props)
		var topic = this.props.topic;
		return (
			<div className="topic">
				<div className="details">
					<h2>{topic.title}</h2>
					<Hashtag tag={topic.hashtag} />
					<Score score={topic.meta.score} />
				</div>
				<div>
					<div className="left col-sm-4">
						<StoryList stories={topic.stories.left} />
					</div>
					<div className="center col-sm-4">
						<StoryList stories={topic.stories.fact} />
					</div>
					<div className="right col-sm-4">
						<StoryList stories={topic.stories.right} />
					</div>
				</div>
			</div>
		)
	}
});

module.exports = Topic;

function defaultProps(){
	var stories = {meta:{views: 0, articles: 0}, title: "", stories: []}
	return {
		topic: {
			title: "[Topic title]",
			meta: {
				tag: "[#hashtag]",
				score: 0
			},
			stories: {
				left: stories,
				fact: stories,
				right: stories
			}
		}
	};
}
