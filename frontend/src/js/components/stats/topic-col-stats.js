
var React = require('react'),
    ArticlesNum = require('../stats/articles-num'),
    ViewsNum = require('../stats/views-num');

var TopicColStats = React.createClass({
    getDefaultProps: function() {
        return {
            title: "[Title]",
            meta:{
                articles: 0
            }
        }
    },
    render: function() {
        console.log("topic-col-stats", this.props.stats);
        return (
            <div className="topic-col-stats">
                <div>
                    <div className="number">{this.props.meta.articles}</div>
                    {/*<div><ViewsNum views={this.props.meta.views}/></div>*/}
                </div>
            </div>
        );
    }

});

module.exports = TopicColStats;
