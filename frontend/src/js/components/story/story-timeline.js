
var React = require('react');
var StoryLink = require('../story/story-link');

class StoryTimeline extends React.Component {
    render() {
        console.log('story-timeline', this.props);
        var stories = this.props.stories;
        return (
            <div className="story-timeline">
                <div className="line">
                    <div>{this._wrap(stories.stories)}</div>
                </div>
            </div>
        );
    }

    _wrap(items) {
        var times = {};
        return items
        .reduce(function(sets, item){
            var index = sets['keys'][item.meta.created_key];
            if(index != 0 && !index){
                // record index
                    index = sets['groups'].length;
                    sets['keys'][item.meta.created_key] = index;

                // create new group with 3 arrays, because 3 types
                    sets['groups'].push([[],[],[]]);
                }
            sets['groups'][index][item.type].push(item);
            return sets;
        }, {keys: {}, groups: []})
        .groups
        .map(function(group){
            var time = null;
            for(var type=0; type<3; type++){
                    group[type] = group[type].map(function(link){
                        time = link.meta.created_at;
                        return <StoryLink key={link.id} story={link} />;
                    });
                }
            return (
                <div key={time}>
                    <div className="time">{time}&nbsp;&nbsp;<i className="fa fa-calendar-o"></i></div>
                    <div className="row">
                        <div className="type-1">
                            {group[1]}
                        </div>
                        <div className="type-0">
                            {group[0]}
                        </div>
                        <div className="type-2">
                            {group[2]}
                        </div>
                    </div>
                </div>);
        });
    }
}

StoryTimeline.defaultProps = {
    stories: {
        title: '',
        meta: {articles: 0},
        stories: []
    }
};

module.exports = StoryTimeline;
