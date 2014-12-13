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
                    On <a href={this.props[this.props.model].topic.link}>
                        <b>{this.props[this.props.model].topic.title}</b>
                        </a>,
                    <span className="label label-primary model">{this.props.model}</span>
                </div>
                <blockquote>
                    <a href={"/#/link/"+this.props[this.props.model].id}>
                        {this.props[this.props.model].title}
                    </a>
                    <small>author, {this.props[this.props.model].url}</small>
                </blockquote>
                <small className="meta">
                    {this.props.action} by <i>{this.props.actor}</i>
                </small>
            </div>
        );
    }
});

module.exports = Activity;
