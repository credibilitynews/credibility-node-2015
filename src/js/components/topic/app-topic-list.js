/** @jsx React.DOM */
var React = require('react');
var TopicLink = require('./app-topic-link');

var TopicList = React.createClass({
	render: function(){
		var topics = this.props.list.map(function(i){
			return (<li><TopicLink meta={i.meta} title={i.title} /></li>)
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
