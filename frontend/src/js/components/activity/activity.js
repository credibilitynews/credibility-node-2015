import React from "react";

import TopicStore from "stores/topic-store";
import UserStore from "stores/user-store";

import { TopicLink, StoryLink } from "app-link";

class Activity extends React.Component {
  constructor(props, context) {
    super(props, context);
    this._handleTopicStoreChange = this._handleTopicStoreChange.bind(this);
    this._handleUserStoreChange = this._handleUserStoreChange.bind(this);

    this.state = {
      topic: {},
      author: {},
      user: {},
    };
  }

  componentWillMount() {
    UserStore.addListener(this._handleUserStoreChange);
    TopicStore.addListener(this._handleTopicStoreChange);
  }

  componentWillUnmount() {}

  render() {
    return (
      <div className="activity">
        <span className="label label-primary">News</span>{" "}
        <small className="label meta pull-right">
          <i>{this.props.article.user_name}</i>
        </small>
        <div>
          On{" "}
          <TopicLink
            id={this.props.article.topic_id}
            title={this.props.article.topic_title}
          >
            {this.props.article.topic_title}
          </TopicLink>
          ,
        </div>
        <blockquote>
          <div>
            <StoryLink className="link-title" link={this.props.article}>
              {this.props.article.title}
            </StoryLink>
          </div>
          <small className="meta">
            - {this.props.article.author_id || "(unknown author)"},{" "}
            {this.props.article.news_agency_id || "(unknown publisher)"}
          </small>
        </blockquote>
      </div>
    );
  }

  _handleUserStoreChange() {
    const user = UserStore.getUser(this.props.article.user_id);
    if (user) this.setState({ user });
  }

  _handleTopicStoreChange() {
    const topic = TopicStore.getTopic(this.props.article.topic_id);
    // console.log(topic);
    if (topic) this.setState({ topic });
  }
}

export default Activity;
