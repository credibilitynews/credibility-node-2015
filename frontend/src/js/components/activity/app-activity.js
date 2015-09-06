
var React = require('react');
var ViewsNum = require('../stats/app-views-num');
var TopicActions = require('actions/topic-actions'),
    UserActions = require('actions/user-actions');
var TopicStore = require('stores/app-topic-store'),
    UserStore = require('stores/app-user-store');

var Activity = React.createClass({
    getInitialState: function(){
        return {
            topic: {},
            author: {},
            user: {},
        }
    },
    componentWillMount: function(){
        UserStore.addChangeListener(this._handleUserStoreChange);
        TopicStore.addChangeListener(this._handleTopicStoreChange);
    },
    componentWillUnmount: function(){
        UserStore.removeChangeListener(this._handleUserStoreChange);
        TopicStore.removeChangeListener(this._handleTopicStoreChange);
    },
    componentDidMount: function(){
        if(this.props.article.topic_id)
            TopicActions.fetchTopicsById(this.props.article.topic_id);

        if(this.props.article.user_id)
            UserActions.fetchUsersById(this.props.article.user_id);

    },
    render: function(){

        return (
            <div className="activity">
                <div>
                    On <a href={"/topic/"+this.props.article.topic_id}>
                        <strong>{this.state.topic.title}</strong>
                        </a>,
                    <span className="label label-primary model">Article</span>
                </div>
                <blockquote>
                    <div>
                        <a href={"/link/"+this.props.article.id}>
                            {this.props.article.title}
                        </a>
                    </div>
                    <small>- {this.state.author.name}, {this.props.article.domain_name}</small>
                </blockquote>
                <small className="meta">
                    added by <i>{this.state.user.name}</i>
                </small>
            </div>
        );
    },
    _handleUserStoreChange: function(){
        var user = UserStore.getUser(this.props.article.user_id);
        if(user) this.setState({user: user});
    },
    _handleTopicStoreChange: function(){
        var topic = TopicStore.getTopic(this.props.article.topic_id);
        //console.log(topic);
        if(topic) this.setState({topic: topic})
    }
});

module.exports = Activity;
