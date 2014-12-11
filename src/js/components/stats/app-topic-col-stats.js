/** @jsx React.DOM */
var React = require('react');

var TopicColStats = React.createClass({
    getDefaultProps: function() {
        return {
            title: "[Title]",
            stats:{
                articles: 0
            }
        }
    },
    render: function() {
        return (
            <div>
            <div className="col-xs-6">
                {this.props.title}</div>
            <div className="col-xs-6 text-right">
                {this.props.stats.articles}</div>
            </div>
        );
    }

});

module.exports = TopicColStats;
