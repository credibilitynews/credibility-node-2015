/** @jsx React.DOM */
var React = require('react'),
    ArticlesNum = require('../stats/app-articles-num'),
    ViewsNum = require('../stats/app-views-num');

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
        console.log("props", this.props.stats);
        return (
            <div className="topic-col-stats">
                <div>
                    {this.props.title}
                </div>
                <div>
                    <div className="number">{this.props.stats.articles}</div>
                    <div><ViewsNum views={this.props.stats.views}/></div>
                </div>
            </div>
        );
    }

});

module.exports = TopicColStats;
