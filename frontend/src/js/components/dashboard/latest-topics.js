
'use strict';
import React from 'react';
import TopicLink from '../topic/topic-link';

class LatestTopics extends React.Component {
    render() {
        return (
            <div className="latest-topics">
                <h1>News Update</h1>
                <ul>{this._wrapItems(this.props.topics)}</ul>
            </div>
        );
    }

    _wrapItems(items) {
        return items.map(function(item){
            return (
                <li key={item.id}>
                    <TopicLink title={item.title} hashtag={item.hashtag} score={item.meta.views}/>
                </li>);
        });
    }
}

LatestTopics.defaultProps = {
    topics: []
};

module.exports = LatestTopics;
