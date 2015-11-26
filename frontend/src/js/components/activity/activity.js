'use strict';
import React from 'react';

import TopicStore from 'stores/topic-store';
import UserStore from 'stores/user-store';

import {Link} from 'react-router-component';
import slug from 'slug';

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
                    On <Link href={'/topic/'+this.props.article.topic_id+'/'+slug(this.props.article.topic_title)}>
                        <strong>{this.props.article.topic_title}</strong>
                        </Link>,
                </div>
                <blockquote>
                    <div>
                        <Link className="link-title" href={'/link/'+this.props.article.id+'/'+slug(this.props.article.title)}>
                            {this.props.article.title}
                        </Link> <span className="label label-primary">News</span>
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
