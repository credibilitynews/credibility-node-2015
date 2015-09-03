
var React = require('react');

var SearchBar = React.createClass({
	render: function(){
		return (
			<div className="row">
				<div className="col-xs-12">
				<input type="text" className="form-control col-xs-12" placeholder="Search a topic/article"/>
				</div>
			</div>)
	}
});

module.exports = SearchBar;
