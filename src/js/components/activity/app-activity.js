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
                    <i>{this.props.actor}</i> just <b>{this.props.action} an {this.props.model}</b> in <a href={this.props[this.props.model].topic.link}>{this.props[this.props.model].topic.title}</a>
                    <div style={{float: "right"}}><ViewsNum views={this.props.views}/></div>

                </div>
                <blockquote>{this.props[this.props.model].title}<small>{this.props.created_at}</small></blockquote>
            </div>
        );
    }
});

module.exports = Activity;
