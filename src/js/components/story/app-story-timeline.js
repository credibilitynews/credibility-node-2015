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
		return items
		.reduce(function(sets, item){
			var index = sets['keys'][item.meta.created_key];
			if(!index){
				// record index
				index = sets['groups'].length;
				sets['keys'][item.meta.created_key] = index;

				// create new group with 3 arrays, because 3 types
				sets['groups'].push([[],[],[]]);
			}
			sets['groups'][index][item.type].push(item);
			return sets;
		}, {keys: {}, groups: []})
		.groups
		.map(function(group){
			var time = null;
			for(var type=0; type<3; type++){
				group[type] = group[type].map(function(link){
					time = link.meta.created_at;
					return <StoryLink story={link} />;
				});
			}
			return (
				<div>
					<div className="time">{time}</div>
					<div className="row">
						<div className="type-1">
							{group[1]}
						</div>
						<div className="type-0">
							{group[0]}
						</div>
						<div className="type-2">
							{group[2]}
						</div>
					</div>
				</div>)
		});
	}
});

module.exports = StoryTimeline;
