/** @jsx React.DOM */
var React = require('react');

var UserMenu = React.createClass({
	getDefaultProps: function() {
		return {
			items: [{
				path: '#/user/login',
				label: 'login'
			},
			{
				path: '#/user/sign_up',
				label: 'sign up'
			}]
		};
	},
	render: function(){
		var items = this.props.items.map(function(item){
			return <li className="text-right"><a href={item.path}>{item.label}</a></li>
		});
		return (
			<ul className="nav navbar-nav navbar-right">{items}</ul>
		)
	}
})

module.exports = UserMenu;
