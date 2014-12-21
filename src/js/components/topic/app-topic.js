/** @jsx React.DOM */
var React = require('react');
var Hashtag = require('../tag/app-hashtag');
var StoryList = require('../story/app-story-list');
var StoryTimeline = require('../story/app-story-timeline');

var Score = require('../stats/app-score');
var ViewsNum =  require('../stats/app-views-num');
var ArticlesNum =  require('../stats/app-articles-num');
var TopicStats = require('../stats/app-topic-stats');

var Router = require('react-router');
var TopicStore = require('../../stores/app-topic-store');
var ServerActions = require('../../actions/app-server-actions');

var Topic = React.createClass({
	mixins: [Router.State],
	getInitialState: function() {
		return {
			topic: null
		};
	},
	topicId: null,
	topic: null,

	componentWillMount: function(){
		this.topicId = parseInt(this.getParams().topicId);
		this.topic = TopicStore.getTopic(this.topicId);
		if(this.topic){
			this.setState({topic: this.topic});
		}
	},
	componentDidMount: function() {
		if(!this.topic){
			TopicStore.addChangeListener(this._onTopicChange);
			ServerActions.fetchTopic(this.topicId);
		}
	},
	_onTopicChange: function(_topicId){
		if(_topicId && this.topicId && _topicId == this.topicId){
			var topic = TopicStore.getTopic(this.topicId);
			this.setState({topic: topic});
		}
	},
	render: function(){
		console.log('topic', this.state);
		if(this.state.topic == null){
			return <div />;
		}
		var topic = this.state.topic;

		return (
			<div className="topic">
				<div className="details panel panel-info">
					<div className="panel-body">
					<h2>{topic.title}</h2>
					<Hashtag tag={topic.hashtag} />
					<Score score={topic.meta.score} />
					<ViewsNum views={topic.meta.views} />
					<ArticlesNum articles={topic.meta.articles} />
					</div>
				</div>
				<div className="timeline">
					<StoryTimeline stories={topic.stories.all} />
				</div>
			</div>
		)
	}
});

module.exports = Topic;
