/** @jsx React.DOM */
var React = require('react'),
    TopicLink = require('../topic/app-topic-link'),
    TopicStats = require('../stats/app-topic-stats'),
    merge = require('object-assign');

var Stats = React.createClass({
    getDefaultProps: function() {
        return {
            topics: []
        };
    },
    render: function() {
        return (
            <div>
                <h3>Ongoing Debates</h3>
                {this._wrap(this.props.topics)}
            </div>
        );
    },
    _wrap: function(stats){
        return stats.map(function(stat){
            var meta = {
                views: stat.views,
                articles: 0
            };
            var sides = {
                left: {title: "left", stats: {articles: stat.left.length, views: stat.views}},
                right: {title: "right", stats: {articles: stat.right.length, views: stat.views}},
                fact: {title: "fact", stats: {articles: stat.fact.length, views: stat.views}}
            };
            return(
                <div key={stat.id}>
                    <TopicStats title={stat.title} stats={meta} sides={sides} hashtag={stat.hashtag} />
                </div>);
        })
    }

});

module.exports = Stats;
