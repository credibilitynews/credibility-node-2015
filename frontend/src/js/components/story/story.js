'use strict';

import React from 'react';

import LinkActions from 'actions/link-actions';
import LinkStore from 'stores/link-store';

import StoryLink from 'components/story/story-link';

import {preFetchable, preFetchableDestructor} from 'pre-fetchable';

class Story extends React.Component {
    constructor(props, context){
        super(props, context);

        this._listeners = [];
        this._handleLinkChange = this._handleLinkChange.bind(this);

        this.state = {
            link: LinkStore.getLinkById(this.props.storyId)
        };
    }

    componentWillMount() {
        this._listeners.push(
            LinkStore.addListener(this._handleLinkChange));
    }

    componentWillUnmount() {
        this._listeners.forEach(listener => listener.remove());
    }

    componentDidMount (){
        if(!this.state.link)
            LinkActions.fetchLinks(this.props.storyId);
    }

    render() {
        if(!this.state.link) return <div/>;

        return (
            <div className="story-view">
                <StoryLink story={this.state.link}/>
            </div>
        );
    }
    _handleLinkChange () {
        this.setState({
            link: LinkStore.getLinkById(this.props.storyId)
        });
    }
}

module.exports = preFetchable(Story,
    LinkActions.fetchLinks,
    preFetchableDestructor(Story)
);
