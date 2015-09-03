
var React = require('react');

var ArticlesNum = React.createClass({
	getDefaultProps: function() {
		return {
			text: false
		};
	},
	render: function(){
		return (
			<span className="articles-num label">
				{this.props.text ? this.props.articles : <i className="fa fa-file-text-o"></i>}
				{this.props.text ? <span className="text">Articles</span> : this.props.articles}
			</span>
		)
	}
})

module.exports = ArticlesNum;
