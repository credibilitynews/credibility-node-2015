
'use strict';
import React from 'react';
import Header from './app-header.js';
import Footer from './app-footer.js';

class Template extends React.Component {
    render() {

        var userDoc = typeof user === 'undefined' && !this.props.user ?
            null : (this.props.user || user);

        return (
            <div>
                <Header user={userDoc}/>
                <div className="container-fluid content">
                    {this.props.children}
                </div>
                <Footer />
            </div>
        );
    }
}

module.exports = Template;
