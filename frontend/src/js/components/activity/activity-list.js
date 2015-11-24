'use strict';
var React = require('react'),
    Activity = require('components/activity/activity'),

    LinkActions = require('actions/link-actions'),
    LatestActicleStore = require('stores/latest-article-store');

LinkActions.fetchLatestLinks();

class ActivityList extends React.Component {
    constructor(props, context) {
        super(props, context);
        this._handleStoreChange = this._handleStoreChange.bind(this);

        this.state = {
            articles: LatestActicleStore.getAllArticles()
        };
    }

    componentWillMount() {
        LatestActicleStore.addChangeListener(this._handleStoreChange);
    }

    componentWillUnMount() {
        LatestActicleStore.removeChangeListener(this._handleStoreChange);
    }

    componentDidMount() {
        if(this.state.articles.length == 0)
            LinkActions.fetchLatestLinks();
    }

    render() {
        //console.log('activity-list', this.state);
        return (
            <div className="activity-list row">
                <div className="col-xs-12">
                    <h3>News Updates</h3>
                </div>
                <div className="col-xs-12">
                    {this._wrap(this.state.articles)}
                </div>
            </div>);
    }

    _wrap(items) {
        return items.map(function(item, index){
            return (
                <div key={index} className="activity-list-item">
                    <div className="content">
                        <Activity key={item.id} article={item}/>
                    </div>
                </div>);
        });
    }

    _handleStoreChange() {
        this.setState(this.getInitialState());
    }
}

module.exports = ActivityList;
