/** @jsx React.DOM */
var React = require('react');

var Score = React.createClass({
	render: function(){
		var style= {"marginRight": "5px"};
		return (
			<span className="label label-warning">
				<span className="glyphicon glyphicon-certificate" style={style}></span>{this.props.score}
			</span>
		)
	}
})

module.exports = Score;
