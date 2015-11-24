
var React = require('react');

class Hashtag extends React.Component {
    _link(hashtag) {
		return "https://twitter.com/hashtag/"+hashtag.slice(1);
	}

    _split(hashtags) {
		return hashtags
			.split(' ')
			.map(function(tag){
				return (<span key={tag}><a href={this._link(tag)}>{tag}</a>&nbsp;</span>)
			}.bind(this))
	}

    render() {
		return (
			<div className="tag" href="#">
				{this._split(this.props.tag)}
			</div>
		)
	}
}

Hashtag.defaultProps = {
    tag: ""
};

module.exports = Hashtag;
