var React = require('react'),
    TopicLink = require('../topic/topic-link'),
    TopicStats = require('../stats/topic-stats'),
    merge = require('object.assign'),

    TopicActions = require('actions/topic-actions'),
    TopicStore = require('stores/topic-store');

TopicActions.fetchLatestTopics();
var RecentTopics = React.createClass({
    getInitialState: function() {
        return {
            topics: TopicStore.getLatestTopics()
        };
    },

    componentWillMount: function(){
        TopicStore.addChangeListener(this._handleStoreChange);
    },
    componentWillUnmount: function(){
        TopicStore.removeChangeListener(this._handleStoreChange);
    },
    componentDidMount: function(){
        if(this.state.topics.length == 0)
            TopicActions.fetchLatestTopics();
    },

    render: function() {
        //console.log("debates", this.props);
        return (
            <div>
                <h3>Recent Topics</h3>
                <ol>{this._wrap(this.state.topics)}</ol>
            </div>
        );
    },
    _wrap: function(items){
        if(!items) return <div />
        return items.map(function(item){
            return(
                <li key={item.id}>
                    <TopicStats topic={item}/>
                </li>);
        });
    },
    _handleStoreChange: function(){
        //console.log('changed');
        this.setState(this.getInitialState());
    }
});

module.exports = RecentTopics;
