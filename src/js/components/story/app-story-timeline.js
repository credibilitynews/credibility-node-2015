/** @jsx React.DOM */
var React = require('react');
var StoryLink = require('../story/app-story-link');

var StoryTimeline = React.createClass({
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
		console.log('story-timeline', this.props);
		var stories = this.props.stories;
		return (
			<div className="story-timeline">
				<div className="hidden-xs">
					<div className="col-sm-1">
					</div>
					<div className="col-sm-11">
						<div className="col-sm-4">Left</div>
						<div className="col-sm-4">Fact</div>
						<div className="col-sm-4">Right</div>
					</div>
				</div>
                <div className="line">
                    <div>{this._wrap(stories.stories)}</div>
                </div>
			</div>
		)
	},
	_wrap: function(items){
		var times = {};
		return items.map(function(item){
			var time = times[item.meta.created_at+":"+item.type] ?
				null : (times[item.meta.created_at+":"+item.type] = item.meta.created_at);
			return (
				<div key={item.id}>
					{time ? <div className="time">{time}</div> : ""}
					<div className="row"><StoryLink story={item} /></div>
				</div>)
		});
	}
});

module.exports = StoryTimeline;
