
var React = require('react'),
    Activity = require('components/activity/app-activity'),

    LinkActions = require('actions/link-actions'),
    LatestActicleStore = require('stores/app-latest-article-store');

var ActivityList = React.createClass({
    getInitialState: function() {
        return {
            articles: LatestActicleStore.getAllArticles()
        };
    },
    componentWillMount: function(){
        LatestActicleStore.addChangeListener(this._handleStoreChange);
        LinkActions.fetchLatestLinks();
    },
    componentWillUnMount: function(){
        LatestActicleStore.removeChangeListener(this._handleStoreChange);
    },
    componentDidMount: function(){

    },
    render: function() {
        //console.log('activity-list', this.state);
        return (
            <div className="activity-list row">
                <div className="col-xs-12">
                    <h3>Latest Updates</h3>
                </div>
                <div className="col-xs-12">
                    {this._wrap(this.state.articles)}
                </div>
            </div>);
    },

    _wrap: function(items){
        return items.map(function(item, index){
            return (
                <div key={index} className="activity-list-item">
                    <div className="content">
                        <Activity key={item.id} article={item}/>
                    </div>
                </div>)
        });
    },
    _handleStoreChange: function(){
        this.setState(this.getInitialState());
    }
});

module.exports = ActivityList;
