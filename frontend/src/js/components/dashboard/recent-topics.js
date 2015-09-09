var React = require('react'),
    TopicLink = require('../topic/topic-link'),
    TopicStats = require('../stats/topic-stats'),
    merge = require('object.assign'),

    TopicStore = require('stores/topic-store');

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
        TopicActions.fetchLatestTopics();
    },

    render: function() {
        //console.log("debates", this.props);
        return (
            <div>
                <h3>Recent Topics</h3>
                {this._wrap(this.state.topics)}
            </div>
        );
    },
    _wrap: function(items){
        if(!items) return <div />
        return items.map(function(item){
            return(
                <div key={item.id}>
                    <TopicStats topic={item}/>
                </div>);
        });
    },
    _handleStoreChange: function(){
        //console.log('changed');
        this.setState(this.getInitialState());
    }
});

module.exports = RecentTopics;
