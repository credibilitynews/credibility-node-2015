/** @jsx React.DOM */
var React = require('react');
var Hashtag = require('../tag/app-hashtag');
var StoryList = require('../story/app-story-list');
var Score = require('../stats/app-score');
var TopicStats = require('../stats/app-topic-stats');

var Topic = React.createClass({
	getDefaultProps: function() {
		return {
			title: "[Topic title]",
			meta: {
				tag: "[#hashtag]",
				score: 0
			},
			stories: {
				left: [{
					meta: {
						domain_name: '[domain]',
						author: '[author]',
						created_at: '[created_at]'
					},
					title: "[Story title]"
				}],
				center: [{
					meta: {
						domain_name: '[domain]',
						author: '[author]',
						created_at: '[created_at]'
					},
					title: "[Story title]"
				}],
				right: [{
					meta: {
						domain_name: '[domain]',
						author: '[author]',
						created_at: '[created_at]'
					},
					title: "[Story title]"
				}]
			}
		};
	},
	render: function(){
		return (
			<div className="topic">
				<div className="details">
					<h2>{this.props.title}</h2>
					<Hashtag tag={this.props.meta.tag} />
					<Score score={this.props.meta.score} />
				</div>
				<div>
					<div className="left col-sm-4">
						<StoryList list={this.props.stories.left} title="Left" />
					</div>
					<div className="center col-sm-4">
						<StoryList list={this.props.stories.center} title="Fact-based" />
					</div>
					<div className="right col-sm-4">
						<StoryList list={this.props.stories.right} title="Right" />
					</div>
				</div>
			</div>
		)
	}
});

module.exports = Topic;
