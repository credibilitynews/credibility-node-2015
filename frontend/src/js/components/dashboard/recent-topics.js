import React from "react";

import TopicActions from "actions/topic-actions";
import TopicStore from "stores/topic-store";

import { preFetchable } from "pre-fetchable";
import TopicStats from "../stats/topic-stats";

class RecentTopics extends React.Component {
  constructor(props, context) {
    super(props, context);
    this._handleStoreChange = this._handleStoreChange.bind(this);

    this.state = {
      topics: TopicStore.getLatestTopics(),
    };
  }

  componentWillMount() {
    TopicStore.addListener(this._handleStoreChange);
  }

  componentWillUnmount() {}

  componentDidMount() {
    if (this.state.topics.length == 0) TopicActions.fetchLatestTopics();
  }

  render() {
    // console.log("debates", this.props);
    return (
      <div className="recent-topics panel panel-default">
        <div className="panel-body">
          <h2>Recent Topics</h2>
          <div>{this.renderTopics(this.state.topics)}</div>
        </div>
      </div>
    );
  }

  renderTopics(items) {
    if (!items) return <div />;
    return items.map(([id, item]) => (
      <div key={item.id} className="topic-link">
        <TopicStats topic={item} />
      </div>
    ));
  }

  _handleStoreChange() {
    console.log("changed", TopicStore.getLatestTopics());
    this.setState({
      topics: TopicStore.getLatestTopics(),
    });
  }
}

export default preFetchable(RecentTopics, TopicActions.fetchLatestTopics);
