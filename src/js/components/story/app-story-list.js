/** @jsx React.DOM */
var React = require('react');
var StoryLink = require('../story/app-story-link');

var StoryList = React.createClass({
	getDefaultProps: function() {
		return {
		};
	},
	render: function(){
		var stories = this.props.list.map(function(i){
			return (<li><StoryLink meta={i.meta} title={i.title} /></li>)
		});

		return (
			<div className="story-list">
				<h4>{this.props.title}</h4>
				<div>{stories.length} story links</div>
				<ul>
					{stories}
				</ul>
			</div>
		)
	}
});

module.exports = StoryList;
