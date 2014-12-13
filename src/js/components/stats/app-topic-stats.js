/** @jsx React.DOM */
var React = require('react'),
    TopicColStats = require('./app-topic-col-stats'),
    ArticlesNum = require('../stats/app-articles-num'),
    ViewsNum = require('../stats/app-views-num'),
    HashTag = require('../tag/app-hashtag');

var TopicStats = React.createClass({
    getDefaultProps: function() {
        return {
            title: "[Title]",
            stats: {
                views: 0,
                articles: 0
            },
            sides: {
                left: {
                    title: "left",
                    stats:{
                        articles: 0,
                        comments: 0
                    }
                },
                right: {
                    title: "right",
                    stats: {
                        articles: 0,
                        comments: 0
                    }
                }
            }
        };
    },
    _totalViews: function() {
        return this.props.sides.left.stats.views
            + this.props.sides.right.stats.views
            + this.props.sides.fact.stats.views;
    },
    _totalArticles: function() {
        return this.props.sides.left.stats.articles
        + this.props.sides.right.stats.articles
        + this.props.sides.fact.stats.articles;
    },
    render: function() {
        console.log("-", this.props.sides);

        return (
            <div className="topic-stats panel panel-default">
                <div className="panel-body">
                    <div className="col-xs-6">
                        <h4><a>{this.props.title}</a></h4>
                        <HashTag tag={this.props.hashtag}/>
                        <div>
                            <span><ViewsNum views={this._totalViews()}/></span>
                            <span><ArticlesNum articles={this._totalArticles()}/></span>
                        </div>
                    </div>
                    <div className="left col-xs-2">
                        <TopicColStats title={this.props.sides.left.title} stats={this.props.sides.left.stats}/>
                    </div>
                    <div className="fact col-xs-2">
                        <TopicColStats title={this.props.sides.fact.title} stats={this.props.sides.fact.stats}/>
                    </div>
                    <div className="right col-xs-2">
                        <TopicColStats title={this.props.sides.right.title} stats={this.props.sides.right.stats}/>
                    </div>
                </div>
            </div>
        );
    }

});

module.exports = TopicStats;
