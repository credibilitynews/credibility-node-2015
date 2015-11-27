'use strict';
import React from 'react';
import StoryLink from 'components/story/story-link';
import {timeAgo, timeStamp as ts} from 'app-utils';

class StoryTimeline extends React.Component {
    render() {
        // console.log('story-timeline', this.props);
        var links = this.props.links;
        return (
            <div className="story-timeline">
                <div className="line">
                    <div>{this.renderStories(links)}</div>
                </div>
            </div>
        );
    }

    renderStories(items) {
        if(items.length == 0) return <i>No stories yet.</i>;

        return items
        .sort((a, b) => {
            a = new Date(a.created_at);
            a = a.getTime();

            b = new Date(b.created_at);
            b = b.getTime();

            return b-a;
        })
        .reduce(function(sets, item){
            var dateKey = new Date(item.created_at);
            dateKey.setHours(0);
            dateKey.setMinutes(0);
            dateKey.setSeconds(0);
            dateKey.setMilliseconds(0);
            dateKey = dateKey.getTime();

            var index = sets.keys[dateKey];
            if(index != 0 && !index){
                // record index
                index = sets.groups.length;
                sets.keys[dateKey] = index;

                // create new group with 3 arrays, because 3 types
                sets.groups.push([[],[],[]]);
            }

            sets.groups[index][item.bias || 0].push(item);
            return sets;
        }, {keys: {}, groups: []})
        .groups
        .map(function(group, index){
            var time = null;
            var timeline = [];
            for(var type=0; type<3; type++){
                timeline.push(group[type].map(function(link){
                    time = timeAgo(ts(link.created_at));
                    return (
                        <div className={'type-'+type}>
                            <StoryLink key={link.id} story={link} />
                        </div>);
                }));
            }


            return (
                <div key={'timeline'+index}>
                    <div className="time">● {time}</div>
                    <div>
                        {timeline}
                    </div>
                </div>);
        });
    }
}

module.exports = StoryTimeline;
