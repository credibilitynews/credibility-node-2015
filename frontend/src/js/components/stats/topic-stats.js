
var React = require('react');
    //TopicColStats = require('./topic-col-stats'),
    //ArticlesNum = require('../stats/articles-num'),
    //ViewsNum = require('../stats/views-num'),
    //HashTag = require('../tag/hashtag');

var TopicStats = React.createClass({
    render: function() {
        //console.log("topic-stats", this.props);
        var topic = this.props.topic;
        return (
            <a href={"/topic/"+topic.id}>{topic.title}</a>
        );
    }

});

module.exports = TopicStats;
