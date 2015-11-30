
'use strict';
import React from 'react';
import {Link} from 'react-router-component';

class About extends React.Component {
    render() {
        return (
            <div className="about panel panel-default">
                <div className="panel-body">
                    <h2>About</h2>
                    <div className="summary">
                        <blockquote>Read both sides of the story.</blockquote>
                        <p><Link href="/post">Submit</Link> articles from different perspectives, share your views.</p>
                    </div>
                </div>
            </div>
        );
    }
}

module.exports = About;
