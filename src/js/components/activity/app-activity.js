/** @jsx React.DOM */
var React = require('react');
var ViewsNum = require('../stats/app-views-num');

var Activity = React.createClass({
    getDefaultProps: function(){
        return {
            actor: "[Subject]",
            action: "[verb]",
            model: "story",
            story: {
                title: "[Story title]",
                hashtag: "[#hashtag]",
                views: 0,
                topic: {
                    title: "[Topic title]",
                    link: "/#story"
                },
            }
        }
    },

    render: function(){
        return (
            <div className="activity">
                <div>
                    <i>{this.props.actor}</i> just <b>{this.props.action} a {this.props.model}</b> in <a href={this.props.story.topic.link}>{this.props[this.props.model].topic.title}</a>
                    &nbsp;<ViewsNum views={this.props.story.views}/>
                </div>
                <blockquote>{this.props.story.title}</blockquote>
            </div>
        );
    }
});

module.exports = Activity;
