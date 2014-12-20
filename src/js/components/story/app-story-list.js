/** @jsx React.DOM */
var React = require('react');
var StoryLink = require('../story/app-story-link');

var StoryList = React.createClass({
	getDefaultProps: function() {
		return {
			stories: {
				title: "",
				meta: {articles: 0},
				stories: []
			}
		};
	},
	render: function(){
		console.log('story-list', this.props);
		var stories = this.props.stories;
		return (
			<div className="story-list">
				<h4>{stories.title}</h4>
				<div>{stories.meta.articles} story links</div>
				<ul>
					{this._wrap(stories.stories)}
				</ul>
			</div>
		)
	},
	_wrap: function(items){
		return items.map(function(item){
			return (<li key={item.id}><StoryLink meta={item.meta} title={item.title} /></li>)
		});
	}
});

module.exports = StoryList;
