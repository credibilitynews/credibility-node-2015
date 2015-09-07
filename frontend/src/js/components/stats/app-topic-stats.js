
var React = require('react');
    //TopicColStats = require('./app-topic-col-stats'),
    //ArticlesNum = require('../stats/app-articles-num'),
    //ViewsNum = require('../stats/app-views-num'),
    //HashTag = require('../tag/app-hashtag');

var TopicStats = React.createClass({
    render: function() {
        console.log("topic-stats", this.props);
        var topic = this.props.topic;
        return (
            <div className="topic-stats">
                <div className="">
                    <div className="col-xs-12">
                        <a href={"#/topic/"+topic.id}>{topic.title}</a>
                    </div>
                </div>
            </div>
        );
    }

});

module.exports = TopicStats;
