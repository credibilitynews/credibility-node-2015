'use strict';
import React from 'react';
import UserActions from 'actions/user-actions';

import TopicStore from 'stores/topic-store';
import UserStore from 'stores/user-store';

class Activity extends React.Component {
    constructor(props, context) {
        super(props, context);
        this._handleTopicStoreChange = this._handleTopicStoreChange.bind(this);
        this._handleUserStoreChange = this._handleUserStoreChange.bind(this);

        this.state = {
            topic: {},
            author: {},
            user: {}
        };
    }

    componentWillMount() {
        UserStore.addChangeListener(this._handleUserStoreChange);
        TopicStore.addChangeListener(this._handleTopicStoreChange);
    }

    componentWillUnmount() {
        UserStore.removeChangeListener(this._handleUserStoreChange);
        TopicStore.removeChangeListener(this._handleTopicStoreChange);
    }

    render() {
        return (
            <div className="activity">
                <small className="meta pull-right">
                    <i>{this.props.article.user_name}</i>
                </small>
                <div>
                    On <a href={'/topic/'+this.props.article.topic_id}>
                        <strong>{this.props.article.topic_title}</strong>
                        </a>,
                </div>
                <blockquote>
                    <div>
                        <a className="link-title" href={'/link/'+this.props.article.id}>
                            {this.props.article.title}
                        </a> <span className="label label-primary">News</span>
                    </div>
                    <small className="meta">
                        - {this.props.article.author_id || '(unknown author)'}
                        , {this.props.article.news_agency_id || '(unknown publisher)'}
                    </small>
                </blockquote>
            </div>
        );
    }

    _handleUserStoreChange() {
        var user = UserStore.getUser(this.props.article.user_id);
        if(user) this.setState({user: user});
    }

    _handleTopicStoreChange() {
        var topic = TopicStore.getTopic(this.props.article.topic_id);
        //console.log(topic);
        if(topic) this.setState({topic: topic});
    }
}

module.exports = Activity;
