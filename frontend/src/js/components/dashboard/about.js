
'use strict';
import React from 'react';

class About extends React.Component {
    render() {
        return (
            <div className="about panel panel-default">
                <div className="panel-body">
                    <h4>About</h4>
                    <div>Read both sides of the story.</div>
                    <div><a>Submit</a> articles from different perspectives, share your views.</div>
                </div>
            </div>
        );
    }
}

module.exports = About;
