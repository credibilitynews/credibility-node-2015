
'use strict';
import React from 'react';
import {Link as Link} from 'react-router-component';
import {timeAgo, timeStamp as ts} from 'app-utils';

class StoryLink extends React.Component {
    render() {
        // console.log('story-link', this.props);
        var story = this.props.story;

        return (
            <div className="story-link" data-created={ts(story.created_at)}>
                <div className="info">
                    <Link className="title" href={'/#/story/'+story.id} to={'/#/story/'+story.id}>
                        {story.title}
                    </Link>
                    <a href={story.url} className="domain_name">
                        {decodeURI(story.url)}
                    </a>
                    <span className="author">
                        submitted by {story.user_name}
                    </span>
                    <span className="created_at">
                        , {timeAgo(ts(story.created_at))}
                    </span>

                </div>
            </div>
        );
    }
}

module.exports = StoryLink;
