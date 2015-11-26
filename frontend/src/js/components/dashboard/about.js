
'use strict';
import React from 'react';

class About extends React.Component {
    render() {
        return (
            <div className="about panel panel-default">
                <div className="panel-body">
                {this.props.text}
                </div>
            </div>
        );
    }
}

About.defaultProps = {
    text: (
        <div>
            <h4>About</h4>
            <blockquote>Read both sides of the story.</blockquote>
            <p><a>Submit</a> articles from different perspectives, share your views.</p>
        </div>)
};

module.exports = About;
