/** @jsx React.DOM */
var React = require('react');
var Link = require('react-router').Link;
var ReactIntlMixin = require("react-intl").ReactIntlMixin;

var mui = require('material-ui'),
FlatButton = mui.FlatButton;

var TopMenu = React.createClass({
	mixins: [ReactIntlMixin],
	getDefaultProps: function() {
		return {
			items: [
				{path: '/', label: 'Home'},
				{path: '#/topic', label: 'USA'},
				{path: '#/topic', label: 'Ukraine'},
				{path: '#/topic', label: 'Hong Kong'},
				{path: '#/topic', label: 'Thailand'},
				]
		};
	},
	propTypes: {
		items: React.PropTypes.array.isRequired
	},
	render: function(){
		var items = this.props.items.map(function(item){
			return (
				<li>
					<a href={item.path}>{item.label}</a>
				</li>);
		});
		return (
			<ul className="nav nav-pills navbar-right">{items}</ul>
		)
	}
})

module.exports = TopMenu;
