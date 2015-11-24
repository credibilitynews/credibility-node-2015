
'use strict';
import React from 'react';

// import TopicColStats from './topic-col-stats';
// import ArticlesNum from '../stats/articles-num';
// import ViewsNum from '../stats/views-num';
// import HashTag from '../tag/hashtag';

class TopicStats extends React.Component {
    render() {
        //console.log("topic-stats", this.props);
        var topic = this.props.topic;
        return (
            <a href={'/topic/'+topic.id}>{topic.title}</a>
        );
    }
}

module.exports = TopicStats;
