
"use strict";
var React = require('react'),
    ArticlesNum = require('../stats/articles-num'),
    ViewsNum = require('../stats/views-num');

class TopicColStats extends React.Component {
    render() {
        console.log('topic-col-stats', this.props.stats);
        return (
            <div className="topic-col-stats">
                <div>
                    <div className="number">{this.props.meta.articles}</div>
                    {/*<div><ViewsNum views={this.props.meta.views}/></div>*/}
                </div>
            </div>
        );
    }
}

TopicColStats.defaultProps = {
    title: '[Title]',
    meta:{
        articles: 0
    }
};

module.exports = TopicColStats;
