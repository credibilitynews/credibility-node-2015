
'use strict';
import React from 'react';
import {environment} from 'react-router-component';

// import TopicColStats from './topic-col-stats';
// import ArticlesNum from '../stats/articles-num';
// import ViewsNum from '../stats/views-num';
// import HashTag from '../tag/hashtag';

class TopicStats extends React.Component {
    constructor(props, context) {
        super(props, context);
        this._handleTopicClick = this._handleTopicClick.bind(this);
    }

    render() {
        //console.log("topic-stats", this.props);
        var topic = this.props.topic;
        return (
            <a onClick={this._handleTopicClick}>{topic.title}</a>
        );
    }
    _handleTopicClick (e){
        if(e) e.preventDefault();
        environment.defaultEnvironment.navigate('/topic/'+this.props.topic.id);
    }
}

module.exports = TopicStats;
