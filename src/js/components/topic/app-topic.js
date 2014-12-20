/** @jsx React.DOM */
var React = require('react');
var Hashtag = require('../tag/app-hashtag');
var StoryList = require('../story/app-story-list');
var Score = require('../stats/app-score');

var Router = require('react-router');
var TopicStore = require('../../stores/app-topic-store');
var ServerActions = require('../../actions/app-server-actions');

var Topic = React.createClass({
	mixins: [Router.State],
	getInitialState: defaultProps,
	topicId: null,
	topic: null,
	componentWillMount: function(){
		this.topicId = parseInt(this.getParams().topicId);
		this.topic = TopicStore.getTopic(this.topicId);
		if(this.topic){
			this.setState({topic:this.topic});
		}
	},
	componentDidMount: function() {
		if(!this.topic){
			TopicStore.addChangeListener(this._onTopicChange);
			ServerActions.fetchTopic(this.topicId);
		}
	},
	_onTopicChange: function(_topicId){
		console.log('on', _topicId);
		if(_topicId && this.topicId && _topicId == this.topicId){
			console.log('onChange', _topicId);
			var topic = TopicStore.getTopic(this.topicId);
			this.setState({topic: topic});
		}
	},
	render: function(){
		console.log('topic', this.state);
		var topic = this.state.topic;
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
