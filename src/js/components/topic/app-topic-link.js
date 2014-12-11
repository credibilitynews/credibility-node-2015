/** @jsx React.DOM */
var React = require('react'),
	Tag = require('../tag/app-hashtag'),
	Score = require('../score/app-score'),
	ViewsNum = require('../stats/app-views-num');

var TopicLink = React.createClass({
	getDefaultProps: function() {
		return {
			title: "[Topic Title]",
			hashtag: "[#hashtag]",
			score: 0
		};
	},
	render: function(){
		return (
			<div className="topic-link">

				<div className="row">
					<div className="col-sm-10">
					<div className="title">
						<a href="#">{this.props.title}</a>
					</div>
						<Tag tag={this.props.hashtag}/>
					</div>
					<div className="col-sm-2 stats">
						<div>
							<ViewsNum views={this.props.score} />
						</div>
						<div>
							<Score score={this.props.score}/>
						</div>
					</div>
				</div>
			</div>
		)
	}
});

module.exports = TopicLink;
