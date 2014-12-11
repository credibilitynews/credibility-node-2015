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
                    <div className="col-xs-1 date">Aug</div>
                    <div className="col-xs-11 dated-activities">
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
                    <Activity actor={item.user.name} action="added" model="story" story={this._storify(item)}/>
                </div>)
        }.bind(this))
    },
    _storify: function(item){
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
