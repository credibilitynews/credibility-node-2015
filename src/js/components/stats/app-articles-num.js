/** @jsx React.DOM */
var React = require('react');

var ArticlesNum = React.createClass({
	render: function(){
		var style= {"marginRight": "5px"};
		return (
			<span className="articles-num label" style={style}>
				<i className="glyphicon fa fa-file-text-o"></i>{this.props.articles}
			</span>
		)
	}
})

module.exports = ArticlesNum;
