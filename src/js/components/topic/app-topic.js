/** @jsx React.DOM */
var React = require('react/addons');
var Hashtag = require('../tag/app-hashtag');
var StoryList = require('../story/app-story-list');
var StoryTimeline = require('../story/app-story-timeline');

var Score = require('../stats/app-score');
var ViewsNum =  require('../stats/app-views-num');
var ArticlesNum =  require('../stats/app-articles-num');
var TopicStats = require('../stats/app-topic-stats');

var TopicStore = require('../../stores/app-topic-store');
var ServerActions = require('../../actions/app-server-actions');

var Topic = React.createClass({
	getInitialState: function() {
		return {
			topic: null,
            summaryShown: false
		};
	},
	topicId: null,
	topic: null,

	componentWillMount: function(){
		this.topicId = parseInt(this.props.topicId);
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

        var cx = React.addons.classSet;
        var toggled = cx({
            'short': !this.state.summaryShown,
            'long': this.state.summaryShown
        });

		return (
			<div className="topic">
				<div className="details">
					<div className="content">
						<div className="title">
							<h2>{topic.title}</h2>
							<a>World > Malaysia</a>
	                        <blockquote className={toggled}>
	                            The 2013 Lahad Datu standoff was a military conflict standoff that started on 11 February 2013 and ended on 24 March 2013,[5] it arose after 235 militants, some of whom were armed,[17] arrived by boats in Lahad Datu, Sabah, Malaysia from Simunul island, Tawi-Tawi in the southern Philippines on 11 February 2013.[12][18][19] The group, calling themselves the "Royal Security Forces of the Sultanate of Sulu and North Borneo",[12] was sent by Jamalul Kiram III, one of the claimants to the throne of the Sultanate of Sulu. Kiram stated that their objective was to assert the unresolved territorial claim of the Philippines to eastern Sabah (the former North Borneo).[20] Malaysian security forces surrounded the village of Tanduo in Lahad Datu where the group had gathered and after several weeks of negotiations and broken deadlines for the intruders to withdraw, security forces moved in and routed the Sulu militants.
	                        </blockquote>
	                        <a className="more-link" onClick={this._handleToggle}>
	                            <div>{this.state.summaryShown ? "hide" : "read more"}</div>
	                        </a>
						</div>
						<div className="meta">
	                        <div className="content">
							    <div><span>Hashtags:</span> <Hashtag tag={topic.hashtag} /></div>
	                        	<div><span>Statistics:</span> <ArticlesNum articles={topic.meta.articles} text/>, <ViewsNum views={topic.meta.views} text/></div>
							    <div><span>Related Topics:</span> Venezuela</div>
							    <div><span>Added:</span> {topic.meta.created_at}</div>
	                        </div>
						</div>
					</div>
				</div>
				<div className="timeline">
					<h2>Timeline</h2>
					<StoryTimeline stories={topic.stories.all} />
				</div>
			</div>
		)
	},
    _handleToggle: function(){
        this.setState({summaryShown: !this.state.summaryShown});
    }
});

module.exports = Topic;
