
var React = require('react');
var Link = require('react-router-component').Link;
// var ReactIntlMixin = require("react-intl").ReactIntlMixin;

var TopMenu = React.createClass({
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
	render: function(){
		return (
			<div className="top-menu">
				<ul className="nav nav-pills">
					<li className="nav-item">Tags: </li>
					{this._wrap(this.props.items)}
				</ul>
			</div>)
	},
	_wrap: function(items){
		return items.map(function(item){
			return (
				<li key={item.label} className="nav-item">
					<Link href={item.path}>{item.label}</Link>
				</li>);
		})
	}
})

module.exports = TopMenu;
