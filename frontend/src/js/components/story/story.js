
"use strict";
var React = require('react');

class Story extends React.Component {
    render() {
        return (
            <div className="panel">
                <div className="panel-body">
                    <div>{this.props.meta.domain_name}</div>
                    <div>{this.props.meta.author}</div>
                    <div>{this.props.meta.created_at}</div>
                </div>
            </div>
        );
    }
}

Story.defaultProps = {
    meta: {
        domain_name: 'credibility.io',
        author: 'admin',
        created_at: '2013-01-01'
    }
};

module.exports = Story;
