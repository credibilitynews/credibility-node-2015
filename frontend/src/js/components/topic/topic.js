var React = require('react/addons');
var cx = require('classnames');
var Hashtag = require('components/tag/hashtag');
var StoryList = require('components/story/story-list');
var StoryTimeline = require('components/story/story-timeline');

var Score = require('components/stats/score');
var ViewsNum =  require('components/stats/views-num');
var ArticlesNum =  require('components/stats/articles-num');
var TopicStats = require('components/stats/topic-stats');

var TopicStore = require('stores/topic-store');
var TopicActions = require('actions/topic-actions');

var SearchBar = require('components/search/search-bar');

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
			<div className="row topic">
				<div className="col-sm-12 col-md-8">
					<div className="">
						<h1>{topic.title}</h1>
						<a>{topic.hashtag}</a>
                        <blockquote className={toggled}>
                        </blockquote>
					</div>
					<div className="timeline">
						<p>Timeline</p>
						<StoryTimeline stories={topic.links} />
					</div>
				</div>
				<div className="col-md-4 col-xs-12 right-sidebar">

					<SearchBar />

				    <div>
						<h2>Details</h2>
						<div>Created</div>
							{topic.created_at}
						<div>Hashtags</div>
							<Hashtag tag={topic.hashtag} />
					</div>
                	<div>
						<h2>Statistics</h2>
						<ArticlesNum articles={topic.articles} text/>
						<ViewsNum views={topic.views}/>
					</div>
				    <div>
						<h2>Related</h2>
					</div>
				</div>
			</div>
		)
	},
	_handleStoreChange: function(){
		var topic = TopicStore.getTopic(this.props.topicId);
		console.log('topic', topic);
		this.setState({topic: topic});
	},
    _handleToggle: function(){
        this.setState({summaryShown: !this.state.summaryShown});
    }
});

module.exports = Topic;
