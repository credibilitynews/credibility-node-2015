
var React = require('react'),
	Tag = require('../tag/hashtag'),
	Score = require('../stats/score'),
	ViewsNum = require('../stats/views-num');

class TopicLink extends React.Component {
    render() {
		return (
			<div className="topic-link">
				<div className="row">
					<div className="col-xs-8">
					<div className="title">
						<a href="#">{this.props.title}</a>
					</div>
						<Tag tag={this.props.hashtag}/>
					</div>
					<div className="col-xs-4 stats">
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
}

TopicLink.defaultProps = {
    title: "[Topic Title]",
    hashtag: "[#hashtag]",
    score: 0
};

module.exports = TopicLink;
