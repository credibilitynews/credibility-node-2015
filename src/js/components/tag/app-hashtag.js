/** @jsx React.DOM */
var React = require('react');

var Hashtag = React.createClass({
	_link: function(hashtag){
		return "https://twitter.com/hashtag/"+hashtag.slice(1);
	},
	_split: function(hashtags){
		return hashtags
			.split(' ')
			.map(function(tag){
				return (<span key={tag.id}><a href={this._link(tag)}>{tag}</a>&nbsp;</span>)
			}.bind(this))
	},
	render: function(){
		return (
			<span className="tag" href="#">
				{this._split(this.props.tag)}
			</span>
		)
	}
});

module.exports = Hashtag;
