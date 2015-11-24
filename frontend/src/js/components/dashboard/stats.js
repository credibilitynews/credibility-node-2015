
'use strict';
import React from 'react';

class Stats extends React.Component {
    render() {
        return (
            <div className="stats panel panel-default">
                <div className="panel-body">
                {this.props.text}
                </div>
            </div>
        );
    }
}

Stats.defaultProps = {
    text: (
        <div className="text">
            <h4>News</h4>
            <h5>Most submission:</h5>
            <strong><a>newyorktimes.com</a></strong>
            <h5>Most views:</h5>
            <strong><a>What?</a></strong>
            <h5>Most commented:</h5>
            <strong><a>What?</a></strong>
            <h4>Author</h4>
            <h5>Most credited author:</h5>
            <strong><a>Aaron</a></strong>
            <h4>Topic</h4>
            <h5>Most Views:</h5>
            <strong><a>HongKong Protest</a></strong>
            <h5>Most Controversial:</h5>
            <strong><a>HongKong Protest</a></strong>
            <h5>Most Covered up:</h5>
            <strong><a>Tian An Men</a></strong>
        </div>)
};

module.exports = Stats;
