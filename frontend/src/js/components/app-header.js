import React from 'react';
import { Link } from 'react-router-component';

class Header extends React.Component {
  render() {
    return (
      <nav className="header navbar navbar-light bg-faded" role="navigation">
        <div className="container">
          <Link className="navbar-brand" href="/">
            <span className="brand">Credibility</span>
          </Link>
          <div className="pull-right">
            {this.props.user ? (
              <Link href="/account/logout" className="login">
                Logout
              </Link>
            ) : (
              <Link href="/account/login" className="login">
                Login/Signup
              </Link>
            )}
          </div>
        </div>
      </nav>
    );
  }
}

export default Header;
