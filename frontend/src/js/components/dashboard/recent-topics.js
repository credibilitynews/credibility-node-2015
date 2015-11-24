'use strict';
import React from 'react';
import TopicStats from '../stats/topic-stats';

import TopicActions from 'actions/topic-actions';
import TopicStore from 'stores/topic-store';

TopicActions.fetchLatestTopics();

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
            <div>
                <h3>Recent Topics</h3>
                <ol>{this._wrap(this.state.topics)}</ol>
            </div>
        );
    }

    _wrap(items) {
        if(!items) return <div />;
        return items.map(function(item){
            return(
                <li key={item.id}>
                    <TopicStats topic={item}/>
                </li>);
        });
    }

    _handleStoreChange() {
        //console.log('changed');
        this.setState(this.getInitialState());
    }
}

module.exports = RecentTopics;
