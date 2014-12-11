/** @jsx React.DOM */
var React = require('react'),
    TopicLink = require('../topic/app-topic-link'),
    TopicStats = require('../stats/app-topic-stats');

var Stats = React.createClass({

    render: function() {
        return (
            <div>
                <h2>Stats</h2>
                <TopicStats />
                <TopicStats />
                <TopicStats />
            </div>
        );
    }

});

module.exports = Stats;
