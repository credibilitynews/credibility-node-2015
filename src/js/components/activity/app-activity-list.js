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
                    <Activity actor={item.user.name}
                        action="added" model="article" views={item.views} created_at={item.created_at}
                        article={this._wrapOne(item)}/>
                    </div>
                </div>)
        }.bind(this))
    },
    _wrapOne: function(item){
        return {
            title: item.title,
            views: item.views,
            id: item.id,
            url: (new URL(item.url).hostname),
            topic: {
                title: item.topic_title,
                link: "/#/topic/"+ item.topic_id
            }
        };
    },


});

module.exports = ActivityList;
