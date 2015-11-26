'use strict';
import React from 'react';
import Activity from 'components/activity/activity';

import LinkActions from 'actions/link-actions';
import LatestActicleStore from 'stores/latest-article-store';

class List extends React.Component {
    constructor(props, context) {
        super(props, context);

        this._handleStoreChange = this._handleStoreChange.bind(this);

        this.state = {
            articles: LatestActicleStore.getAllArticles()
        };
    }

    componentWillMount() {
        LatestActicleStore.addChangeListener(this._handleStoreChange);
    }

    componentWillUnMount() {
        LatestActicleStore.removeChangeListener(this._handleStoreChange);
    }

    componentDidMount() {
        if(this.state.articles.length == 0)
            LinkActions.fetchTaggedLinks(this.props.tagId);
    }

    componentWillReceiveProps(nextProps){
        if(this.props.tagId != nextProps.tagId){
            LinkActions.fetchTaggedLinks(nextProps.tagId);
        }
    }

    render() {
        return (
            <div className="activity-list row">
                <div className="col-xs-12">
                    <h3>{this.state.articles && this.state.articles.length > 0? this.state.articles[0].tag_name : <i>Loading tag...</i>}</h3>
                </div>
                <div className="col-xs-12">
                    {this.renderLinks(this.state.articles)}
                </div>
            </div>);
    }

    renderLinks(items) {
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
        // console.log('_handleStoreChange')
        this.setState({
            articles: LatestActicleStore.getAllArticles()
        });
    }
}



import {preFetchable} from 'pre-fetchable';
module.exports = preFetchable(
    List,
    LinkActions.fetchTaggedLinks);
