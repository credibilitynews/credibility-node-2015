'use strict';
import React from 'react';
import Activity from 'components/activity/activity';

import LinkActions from 'actions/link-actions';
import LatestLinksStore from 'stores/latest-links-store';

class ActivityList extends React.Component {
    constructor(props, context) {
        super(props, context);
        this._listeners = [];
        this._handleStoreChange = this._handleStoreChange.bind(this);

        this.state = {
            articles: LatestLinksStore.getAllLinks()
        };
    }

    componentWillMount() {
        this._listeners.push(
            LatestLinksStore.addListener(this._handleStoreChange));
    }

    componentWillUnMount() {
        this._listeners.forEach(listener => listener.remove());
        delete this._listeners;
    }

    componentDidMount() {
        if(this.state.articles.length == 0)
            LinkActions.fetchLatestLinks();
    }

    render() {
        console.log('activity-list', this.state);
        return (
            <div className="activity-list row">
                <div className="col-xs-12">
                    <h3>News Updates</h3>
                </div>
                <div className="col-xs-12">
                    {this._wrap(this.state.articles)}
                </div>
            </div>);
    }

    _wrap(items) {
        return items.map(function(item, index){
            return (
                <div key={index} className="activity-list-item">
                    <div className="content">
                        <Activity key={item.id} article={item}/>
                    </div>
                </div>);
        });
    }

    _handleStoreChange() {
        this.setState({
            articles: LatestLinksStore.getAllLinks()
        });
    }
}

import {preFetchable} from 'pre-fetchable';
module.exports = preFetchable(
    ActivityList,
    LinkActions.fetchLatestLinks);
