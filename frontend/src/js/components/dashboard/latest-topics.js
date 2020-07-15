import React from 'react';
import TopicLink from '../topic/topic-link';

class LatestTopics extends React.Component {
  render() {
    return (
      <div className="latest-topics">
        <h1>News Update</h1>
        <ul>{this._wrapItems(this.props.topics)}</ul>
      </div>
    );
  }

  _wrapItems(items) {
    return items.map((item) => (
      <li key={item.id}>
        <TopicLink
          title={item.title}
          hashtag={item.hashtag}
          score={item.meta.views}
        />
      </li>
    ));
  }
}

LatestTopics.defaultProps = {
  topics: [],
};

export default LatestTopics;
