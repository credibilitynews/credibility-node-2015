
var React = require('react');

class Score extends React.Component {
    render() {
		var style= {"marginRight": "5px"};
		return (
			<span className="label label-warning">
				<span className="glyphicon glyphicon-certificate" style={style}></span>{this.props.score}
			</span>
		)
	}
}

module.exports = Score;
