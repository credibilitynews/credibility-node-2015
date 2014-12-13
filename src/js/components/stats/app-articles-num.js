/** @jsx React.DOM */
var React = require('react');

var ArticlesNum = React.createClass({
	render: function(){
		var style= {"marginRight": "5px"};
		return (
			<span className="label label-success" style={style}>
				<span className="glyphicon glyphicon-book" style={style}></span>{this.props.articles}
			</span>
		)
	}
})

module.exports = ArticlesNum;
