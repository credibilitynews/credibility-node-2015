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
        return (
            <div className="latest-topics">
                <h3>Latest Topics</h3>
                <ul>{this._wrapItems(this.props.topics)}</ul>
            </div>
        );
    },
    _wrapItems: function(items) {
        return items.map(function(item){
            return (
                <li key={item.id}>
                    <TopicLink title={item.title} hashtag={item.hashtag} score={item.meta.views}/>
                </li>)
        });
    }

});

module.exports = LatestTopics;
