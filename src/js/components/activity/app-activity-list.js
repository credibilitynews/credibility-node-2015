/** @jsx React.DOM */
var React = require('react'),
    Activity = require('./app-activity');

var ActivityList = React.createClass({
    getDefaultProps: function() {
        return {
            articles: []
        };
    },
    render: function() {
        console.log('activity-list', this.props);
        return (
            <div className="activity-list row">
                <div className="col-xs-12">
                    <h3>Latest Updates</h3>
                </div>
                <div className="col-xs-12">
                    {this._wrap(this.props.articles)}
                </div>

            </div>);
    },

    _wrap: function(items){
        return items.map(function(item){
            return (
                <div key={item.id} className="panel">
                    <div className="panel-body">
                    <Activity actor={item.meta.user.name}
                        action="added" model="article" views={item.meta.views} created_at={item.meta.created_time_ago}
                        article={item}/>
                    </div>
                </div>)
        }.bind(this))
    }
});

module.exports = ActivityList;
