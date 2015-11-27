'use strict';
import React from 'react';
import cx from 'classnames';
import StoryTimeline from 'components/story/story-timeline';

import TopicStore from 'stores/topic-store';
import TopicActions from 'actions/topic-actions';

import TopicLinksStore from 'stores/topic-links-store';
import LinkActions from 'actions/link-actions';

import {preFetchable, preFetchableDestructor, makePipe} from 'pre-fetchable';

class Topic extends React.Component {
    constructor(props, context) {
        super(props, context);
        this._listeners = [];
        this._handleStoreChange = this._handleStoreChange.bind(this);

        this.state = {
            topic: TopicStore.getTopic(this.props.topicId),
            showing: 'timeline',
            links: TopicLinksStore.getAllLinks()
        };
    }

    componentWillMount() {
        TopicStore.addChangeListener(this._handleStoreChange);

        this._listeners.push(
            TopicLinksStore.addListener(this._handleStoreChange));
    }

    componentWillUnmount() {
        TopicStore.removeChangeListener(this._handleStoreChange);

        this._listeners.forEach(listener => listener.remove());
    }

    componentDidMount() {
        if(!this.state.topic)
            TopicActions.fetchTopicsById(this.props.topicId);

        if(!this.state.links || this.state.links.length == 0)
            LinkActions.fetchTopicLinks(this.props.topicId);
    }

    render() {
        var topic = this.state.topic || {};

        var classes = (type) => {
            return cx({
                'nav-link active': this.state.showing == type,
                'nav-link': true
            });
        };
        var onClick = (type) => {
            return (e) => {
                if(e) e.preventDefault();
                this.setState({showing: type});
            };
        };

        return (
            <div className="row topic">
                <div className="col-sm-12 col-md-12">
                    <div style={{textAlign: 'center'}}>
                        <h1>{topic.title}</h1>
                        <a>{topic.hashtag}</a>
                    </div>
                    <div className="timeline">
                        <ul className="nav nav-tabs">
                            <li className="nav-item">
                                <a className={classes('timeline')} onClick={onClick('timeline')}>
                                    Timeline
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className={classes('left')} onClick={onClick('left')}>
                                    Left
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className={classes('unknown')} onClick={onClick('unknown')}>
                                    Unknown
                                </a>
                            </li>
                            <li className="nav-item disabled">
                                <a className={classes('right')} onClick={onClick('right')}>
                                    Right
                                </a>
                            </li>
                        </ul>
                        {this.renderTab(this.state.showing)}
                    </div>
                </div>

            </div>
        );
    }

    renderTab(tab){
        switch(tab){
        case 'timeline':
            return <StoryTimeline links={this.state.links}/>;
        case 'left':
            return <div>Left</div>;
        case 'right':
            return <div>Right</div>;
        case 'unknown':
            return <div>Unknown</div>;
        }
    }

    _handleStoreChange() {
        var topic = TopicStore.getTopic(this.props.topicId);
        this.setState({topic: topic});
    }

    _handleLinksChange() {
        this.setState({links: TopicLinksStore.getAllLinks()});
    }

    _handleToggle() {
        this.setState({summaryShown: !this.state.summaryShown});
    }
}

module.exports = preFetchable(Topic,
    makePipe(TopicActions.fetchTopicsById, LinkActions.fetchTopicLinks),
    preFetchableDestructor(Topic));
