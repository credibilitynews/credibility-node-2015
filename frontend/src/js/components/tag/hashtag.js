
var React = require('react');

var Hashtag = React.createClass({
	getDefaultProps: function() {
		return {
			tag: ""
		};
	},
	_link: function(hashtag){
		return "https://twitter.com/hashtag/"+hashtag.slice(1);
	},
	_split: function(hashtags){
		return hashtags
			.split(' ')
			.map(function(tag){
				return (<span key={tag}><a href={this._link(tag)}>{tag}</a>&nbsp;</span>)
			}.bind(this))
	},
	render: function(){
		return (
			<div className="tag" href="#">
				{this._split(this.props.tag)}
			</div>
		)
	}
});

module.exports = Hashtag;
