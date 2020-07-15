import React from 'react';
import TopicLink from './topic-link';

class TopicList extends React.Component {
  render() {
    const topics = this.props.list.map((i) => (
      <li>
        <TopicLink meta={i.meta} title={i.title} />
      </li>
    ));

    return (
      <div className="col-xs-12">
        <ol>{topics}</ol>
      </div>
    );
  }
}

TopicList.propTypes = {
  list: React.PropTypes.array.isRequired,
};

export default TopicList;
