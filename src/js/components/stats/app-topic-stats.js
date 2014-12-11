/** @jsx React.DOM */
var React = require('react'),
    TopicColStats = require('./app-topic-col-stats');

var TopicStats = React.createClass({
    getDefaultProps: function() {
        return {
            title: "[Title]",
            stats: {
                views: 0,
                articles: 0
            },
            sides: {
                left: {
                    title: "[left]",
                    stats:{
                        articles: 0,
                        comments: 0
                    }
                },
                right: {
                    title: "[right]",
                    stats: {
                        articles: 0,
                        comments: 0
                    }
                }
            }
        };
    },
    render: function() {
        return (
            <div className="topic-stats row">
                <div className="col-xs-6">
                    <div className="col-xs-6">{this.props.title}</div>
                    <div className="col-xs-6">
                        {this.props.stats.views} views.&nbsp;
                        {this.props.stats.articles} articles.
                    </div>
                </div>
                <div className="left col-xs-2 col-xs-offset-1">
                    <TopicColStats title="[left]"/>
                </div>
                <div className="right col-xs-2 col-xs-offset-1">
                    <TopicColStats title="[right]"/>
                </div>
            </div>
        );
    }

});

module.exports = TopicStats;
