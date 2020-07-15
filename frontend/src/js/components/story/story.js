import React from "react";

import LinkActions from "actions/link-actions";
import LinkStore from "stores/link-store";

import StoryLink from "components/story/story-link";

class Story extends React.Component {
  constructor(props, context) {
    super(props, context);

    this._listeners = [];
    this.handleLinkChange = this.handleLinkChange.bind(this);

    this.state = {
      link: LinkStore.getLinkById(this.props.storyId),
    };
  }

  componentWillMount() {
    this._listeners.push(LinkStore.addListener(this.handleLinkChange));
  }

  componentWillUnmount() {
    this._listeners.forEach((listener) => listener.remove());
  }

  componentDidMount() {
    if (!this.state.link) LinkActions.fetchLinks(this.props.storyId);
  }

  render() {
    if (!this.state.link) return <div />;

    return (
      <div className="story-view">
        <StoryLink story={this.state.link} />
      </div>
    );
  }

  handleLinkChange() {
    this.setState({
      link: LinkStore.getLinkById(this.props.storyId),
    });
  }
}

export default Story;
