
'use strict';
var React = require('react');

class UserMenu extends React.Component {
    render() {
        var items = this.props.items.map(function(item){
            return <li key={item.label} className="text-right"><a href={item.path}>{item.label}</a></li>;
        });
        return (
            <ul className="nav navbar-nav navbar-right">{items}</ul>
        );
    }
}

UserMenu.defaultProps = {
    items: [{
        path: '#/user/login',
        label: 'login'
    },
    {
        path: '#/user/sign_up',
        label: 'sign up'
    }]
};

module.exports = UserMenu;
