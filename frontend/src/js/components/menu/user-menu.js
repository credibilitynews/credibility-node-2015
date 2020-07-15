import React from 'react';

class UserMenu extends React.Component {
  render() {
    const items = this.props.items.map((item) => (
      <li key={item.label} className="text-right">
        <a href={item.path}>{item.label}</a>
      </li>
    ));
    return <ul className="nav navbar-nav navbar-right">{items}</ul>;
  }
}

UserMenu.defaultProps = {
  items: [
    {
      path: '#/user/login',
      label: 'login',
    },
    {
      path: '#/user/sign_up',
      label: 'sign up',
    },
  ],
};

export default UserMenu;
