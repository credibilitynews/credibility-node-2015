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
        this._handleTopicChange = this._handleTopicChange.bind(this);
        this._handleLinksChange = this._handleLinksChange.bind(this);
        this.renderTab = this.renderTab.bind(this);

        this.state = {
            topic: TopicStore.getTopic(props.topicId),
            showing: 'timeline',
            links: TopicLinksStore.getAllLinks(props.topicId)
        };
    }

    componentWillMount() {
        TopicStore.addChangeListener(this._handleTopicChange);

        this._listeners.push(
            TopicLinksStore.addListener(this._handleLinksChange));
    }

    componentWillUnmount() {
        TopicStore.removeChangeListener(this._handleTopicChange);

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
                <div className="col-xs-12">
                    <div style={{textAlign: 'center'}}>
                        <h1>{topic.title}</h1>
                        <small>{topic.hashtag}</small>
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
                            <li className="nav-item">
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
            return <StoryTimeline links={this.state.links.filter(link => link.bias == 1)}/>;
        case 'right':
            return <StoryTimeline links={this.state.links.filter(link => link.bias == 2)}/>;
        case 'unknown':
            return <StoryTimeline links={this.state.links.filter(link => link.bias != 1 && link.bias != 2)}/>;
        case 'tweets':
            return <div />;
        default:
            return <div />;
        }
    }

    _handleTopicChange() {
        var topic = TopicStore.getTopic(this.props.topicId);
        this.setState({topic: topic});
    }

    _handleLinksChange() {
        this.setState({
            links: TopicLinksStore.getAllLinks(this.props.topicId)
        });
    }

    _handleToggle() {
        this.setState({summaryShown: !this.state.summaryShown});
    }
}

module.exports = preFetchable(Topic,
    makePipe(TopicActions.fetchTopicsById, LinkActions.fetchTopicLinks),
    preFetchableDestructor(Topic));
