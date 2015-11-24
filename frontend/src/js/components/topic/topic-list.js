
'use strict';
import React from 'react';
import TopicLink from './topic-link';

class TopicList extends React.Component {
    render() {
        var topics = this.props.list.map(function(i){
            return (
                <li>
                    <TopicLink meta={i.meta} title={i.title} />
                </li>);
        });

        return (
            <div className="col-xs-12">
                <ol>
                    {topics}
                </ol>
            </div>
        );
    }
}

TopicList.propTypes = {
    list: React.PropTypes.array.isRequired
};

module.exports = TopicList;
