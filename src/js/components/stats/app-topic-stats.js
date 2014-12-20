/** @jsx React.DOM */
var React = require('react'),
    TopicColStats = require('./app-topic-col-stats'),
    ArticlesNum = require('../stats/app-articles-num'),
    ViewsNum = require('../stats/app-views-num'),
    HashTag = require('../tag/app-hashtag');

var TopicStats = React.createClass({
    getDefaultProps: defaultProps,
    render: function() {
        console.log("topic-stats", this.props);
        topic = this.props.topic;
        return (
            <div className="topic-stats panel panel-default">
                <div className="panel-body">
                    <div className="col-xs-6">
                        <h4><a href={"#/topic/"+topic.id}>{topic.title}</a></h4>
                        <HashTag tag={topic.hashtag}/>
                        <div>
                            <span><ViewsNum views={topic.meta.views}/></span>
                            <span><ArticlesNum articles={topic.meta.articles}/></span>
                        </div>
                    </div>
                    <div className="left col-xs-2">
                        <TopicColStats title={topic.stories.left.title} meta={topic.stories.left.meta}/>
                    </div>
                    <div className="fact col-xs-2">
                        <TopicColStats title={topic.stories.fact.title} meta={topic.stories.fact.meta}/>
                    </div>
                    <div className="right col-xs-2">
                        <TopicColStats title={topic.stories.right.title} meta={topic.stories.right.meta}/>
                    </div>
                </div>
            </div>
        );
    }

});

module.exports = TopicStats;

function defaultProps() {
    return {
        topic: {
            title: "[Title]",
            meta: {
                views: 0,
                articles: 0
            },
            stories: {
                left: {
                    title: "left",
                    meta:{
                        articles: 0,
                        comments: 0
                    }
                },
                right: {
                    title: "right",
                    meta: {
                        articles: 0,
                        comments: 0
                    }
                }
            }
        }
    };
}
