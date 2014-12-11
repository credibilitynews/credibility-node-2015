/** @jsx React.DOM */
var React = require('react');

var SearchBar = React.createClass({
	render: function(){
		return (
			<input type="text" className="form-control col-md-12" placeholder="Search"/>
		)
	}
});

module.exports = SearchBar;
