'use strict';
import React from 'react';
import {Link} from 'react-router-component';

class Header extends React.Component {
    render() {
        return (
            <nav className="header navbar navbar-light bg-faded" role="navigation">
                <Link className="navbar-brand" href="/">
                    <span className="col-brand">Credibility.io</span>
                </Link>
                { this.props.user ?
                    <Link href="/account/logout" className="login pull-right">Logout</Link>
                    : <Link href="/account/login" className="login pull-right">Login/Signup</Link> }
            </nav>
        );
    }
}

module.exports = Header;
