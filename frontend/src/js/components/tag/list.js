'use strict';
import React from 'react';
import Activity from 'components/activity/activity';

import LinkActions from 'actions/link-actions';
import TagLinksStore from 'stores/tag-links-store';

class List extends React.Component {
    constructor(props, context) {
        super(props, context);
        this._listeners = [];
        this._handleStoreChange = this._handleStoreChange.bind(this);

        this.state = {
            articles: TagLinksStore.getAllLinks()
        };
    }

    componentWillMount() {
        this._listeners.push(
            TagLinksStore.addListener(this._handleStoreChange));
    }

    componentWillUnMount() {
        this._listeners.forEach(listener => listener.remove());
        delete this._listeners;
    }

    componentDidMount() {
        if(this.state.articles.length == 0)
            LinkActions.fetchTagLinks(this.props.tagId);
    }

    componentWillReceiveProps(nextProps){
        if(this.props.tagId != nextProps.tagId){
            LinkActions.fetchTagLinks(nextProps.tagId);
        }
    }

    render() {
        return (
            <div className="activity-list row">
                <div className="col-xs-12">
                    <h3>
                        News Update: {this.state.articles && this.state.articles.length > 0? this.state.articles[0].tag_name : <div/>}
                    </h3>
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
            articles: TagLinksStore.getAllLinks()
        });
    }
}



import {preFetchable} from 'pre-fetchable';
module.exports = preFetchable(
    List,
    LinkActions.fetchTagLinks);
