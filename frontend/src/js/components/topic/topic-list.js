
var React = require('react/addons');
var TopicLink = require('./topic-link');

var TopicList = React.createClass({
	propTypes: {
		list: React.PropTypes.array.isRequired
	},
	render: function(){
		var topics = this.props.list.map(function(i){
			return (
				<li>
					<TopicLink meta={i.meta} title={i.title} />
				</li>);
		});

		return (
			<div className="col-xs-12">
				<ol>
					{topics}
				</ol>
			</div>
		)
	}
});

module.exports = TopicList;
