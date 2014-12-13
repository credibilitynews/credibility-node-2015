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
		return (
			<div className="top-menu row">
				<ul className="nav nav-pills">
					<li style={{padding: "10px 0px 10px 15px"}}>Trending now: </li>
					{this._wrap(this.props.items)}
				</ul>
			</div>)
	},
	_wrap: function(items){
		return items.map(function(item){
			return (
				<li key={item.label}>
					<a href={item.path}>{item.label}</a>
				</li>);
		})
	}
})

module.exports = TopMenu;
