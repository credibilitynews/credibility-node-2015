/** @jsx React.DOM */
var React = require('react');

var Stats = React.createClass({
    getDefaultProps: function() {
        return {
            text: (
                <div>
                    <h4>Most newsworthy site:</h4>
                    <strong><a>newyorktimes.com</a></strong>
                    <h4>Most popular journalist:</h4>
                    <strong><a>Aaron</a></strong>
                    <h4>Most views topic:</h4>
                    <strong><a>HongKong Protest</a></strong>
                    <h4>Most controversial topic:</h4>
                    <strong><a>HongKong Protest</a></strong>

                </div>)
        };
    },
    render: function() {
        return (
            <div className="stats panel panel-default">
                <div className="panel-body">
                {this.props.text}
                </div>
            </div>
        );
    }
})

module.exports = Stats;
