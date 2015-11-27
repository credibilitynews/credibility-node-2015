
'use strict';
import React from 'react';
import {TopicLink} from 'app-link';

// import TopicColStats from './topic-col-stats';
// import ArticlesNum from '../stats/articles-num';
// import ViewsNum from '../stats/views-num';
// import HashTag from '../tag/hashtag';

class TopicStats extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        //console.log("topic-stats", this.props);
        var topic = this.props.topic;
        return (
            <TopicLink link={topic}>
                {topic.title}
            </TopicLink>
        );
    }
}

module.exports = TopicStats;
