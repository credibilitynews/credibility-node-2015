/** @jsx React.DOM */
var React = require('react');
var TopicLink = require('../topic/app-topic-link');

var LatestTopics = React.createClass({
    getDefaultProps: function() {
        return {
            topics: []
        };
    },
    render: function() {
        topics = this.props.topics.map(function(item){
            return (<li key={item.id}><TopicLink title={item.title} hashtag={item.hashtag} score={item.views}/></li>)
        });
        return (
            <div className="latest">
                <h3>Latest Topics</h3>
                <ul>{topics}</ul>
            </div>
        );
    }

});

module.exports = LatestTopics;
