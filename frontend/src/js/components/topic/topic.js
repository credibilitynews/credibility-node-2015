'use strict';
import React from 'react';
import cx from 'classnames';
import Hashtag from 'components/tag/hashtag';
import StoryTimeline from 'components/story/story-timeline';

import ViewsNum from 'components/stats/views-num';
import ArticlesNum from 'components/stats/articles-num';

import TopicStore from 'stores/topic-store';
import TopicActions from 'actions/topic-actions';

import SearchBar from 'components/search/search-bar';

class Topic extends React.Component {
    constructor(props, context) {
        super(props, context);
        this._handleStoreChange = this._handleStoreChange.bind(this);

        this.state = {
            topic: null,
            summaryShown: false
        };
    }

    componentWillMount() {
        TopicStore.addChangeListener(this._handleStoreChange);
    }

    componentWillUnmount() {
        TopicStore.removeChangeListener(this._handleStoreChange);
    }

    componentDidMount() {
        if(!this.state.topic)
            TopicActions.fetchTopicsById(this.props.topicId);
    }

    render() {
        var topic = this.state.topic || {};

        var toggled = cx({
            short: !this.state.summaryShown,
            long: this.state.summaryShown
        });

        return (
            <div className="row topic">
                <div className="col-sm-12 col-md-8">
                    <div className="">
                        <h1>{topic.title}</h1>
                        <a>{topic.hashtag}</a>
                        <blockquote className={toggled}>
                        </blockquote>
                    </div>
                    <div className="timeline">
                        <p>Timeline</p>
                        <StoryTimeline stories={topic.links} />
                    </div>
                </div>
                <div className="col-md-4 col-xs-12 right-sidebar">

                    <SearchBar />

                    <div>
                        <h2>Details</h2>
                        <div>Created</div>
                            {topic.created_at}
                        <div>Hashtags</div>
                            <Hashtag tag={topic.hashtag} />
                    </div>
                    <div>
                        <h2>Statistics</h2>
                        <ArticlesNum articles={topic.articles} text/>
                        <ViewsNum views={topic.views}/>
                    </div>
                    <div>
                        <h2>Related</h2>
                    </div>
                </div>
            </div>
        );
    }

    _handleStoreChange() {
        var topic = TopicStore.getTopic(this.props.topicId);
        this.setState({topic: topic});
    }

    _handleToggle() {
        this.setState({summaryShown: !this.state.summaryShown});
    }
}

module.exports = Topic;
