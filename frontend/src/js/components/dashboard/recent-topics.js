'use strict';
import React from 'react';
import TopicStats from '../stats/topic-stats';

import TopicActions from 'actions/topic-actions';
import TopicStore from 'stores/topic-store';

import {preFetchable} from 'pre-fetchable';

class RecentTopics extends React.Component {
    constructor(props, context) {
        super(props, context);
        this._handleStoreChange = this._handleStoreChange.bind(this);

        this.state = {
            topics: TopicStore.getLatestTopics()
        };
    }

    componentWillMount() {
        TopicStore.addChangeListener(this._handleStoreChange);
    }

    componentWillUnmount() {
        TopicStore.removeChangeListener(this._handleStoreChange);
    }

    componentDidMount() {
        if(this.state.topics.length == 0)
            TopicActions.fetchLatestTopics();
    }

    render() {
        //console.log("debates", this.props);
        return (
            <div className="recent-topics panel panel-default">
                <div className="panel-body">
                    <h4>Recent Topics</h4>
                    <div>{this._wrap(this.state.topics)}</div>
                </div>
            </div>
        );
    }

    _wrap(items) {
        if(!items) return <div />;
        return items.map(function(item){
            return(
                <div key={item.id}>
                    <TopicStats topic={item}/>
                </div>);
        });
    }

    _handleStoreChange() {
        //console.log('changed');
        this.setState({
            topics: TopicStore.getLatestTopics()
        });
    }
}

module.exports = preFetchable(
    RecentTopics,
    TopicActions.fetchLatestTopics
);
