
var React = require('react/addons');
var cx = require('classnames');
var Hashtag = require('../tag/hashtag');
var StoryList = require('../story/story-list');
var StoryTimeline = require('../story/story-timeline');

var Score = require('../stats/score');
var ViewsNum =  require('../stats/views-num');
var ArticlesNum =  require('../stats/articles-num');
var TopicStats = require('../stats/topic-stats');

var TopicStore = require('../../stores/topic-store');
var TopicActions = require('../../actions/topic-actions');

var Topic = React.createClass({
	getInitialState: function() {
		return {
			topic: null,
			summaryShown: false
		};
	},
	componentWillMount: function(){
		TopicStore.addChangeListener(this._handleStoreChange);
	},
	componentWillUnmount: function(){
		TopicStore.removeChangeListener(this._handleStoreChange);
	},
	componentDidMount: function() {
		TopicActions.fetchTopicsById(this.props.topicId);
	},

	render: function(){
		var topic = this.state.topic || {};

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
							<a>World - Malaysia</a>
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
	                        	<div><span>Statistics:</span> <ArticlesNum articles={topic.articles} text/>, <ViewsNum views={topic.views} text/></div>
							    <div><span>Related Topics:</span> Venezuela</div>
							    <div><span>Added:</span> {topic.created_at}</div>
	                        </div>
						</div>
					</div>
				</div>
				<div className="timeline">
					<h2>Timeline</h2>
					<StoryTimeline stories={topic.links} />
				</div>
			</div>
		)
	},
	_handleStoreChange: function(){
		var topic = TopicStore.getTopic(this.props.topicId);
		this.setState({topic, topic});
	},
    _handleToggle: function(){
        this.setState({summaryShown: !this.state.summaryShown});
    }
});

module.exports = Topic;
