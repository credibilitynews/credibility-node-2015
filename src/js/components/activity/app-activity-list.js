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
            <div className="activity-list">
                <h2>Updates</h2>
                <div>
                    <div className="col-xs-12 dated-activities">
                        {this._wrap(this.props.articles)}
                    </div>
                </div>
            </div>);
    },

    _wrap: function(items){
        return items.map(function(item){
            console.log("item", item)
            return (
                <div key={item.id}>
                    <Activity actor={item.user.name}
                        action="added" model="article" views={item.views} created_at={item.created_at}
                        article={this._wrapOne(item)}/>
                </div>)
        }.bind(this))
    },
    _wrapOne: function(item){
        return {
            title: item.title,
            views: item.views,
            topic: {
                title: item.topic_title,
                link: "/#/topic/"+ item.topic_id
            }
        };
    },


});

module.exports = ActivityList;
