import React from "react";

import { Locations, Location, NotFound } from "react-router-component";

import Dashboard from "components/dashboard/dashboard";
import Topic from "components/topic/topic";
import Story from "components/story/story";
import Template from "components/app-template";
import AppLogin from "components/user/user-login";
import Post from "components/post/post";
import AboutPage from "components/about/about";
import TermsPage from "components/about/terms";

const tap = (tapped, cb) =>
  function (...args) {
    const res = tapped(...args);
    cb(...args);
    return res;
  };

class App extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleUrlChange = this.handleUrlChange.bind(this);

    this.state = {
      url: props.url,
    };
  }

  componentWillMount() {
    if (typeof window !== "undefined") {
      window.history.pushState = tap(
        window.history.pushState.bind(window.history),
        this.handleUrlChange
      );
    }
  }

  render() {
    return (
      <Template user={this.props.user}>
        <Locations path={this.state.url}>
          <Location path="/post" handler={Post} {...this.props} />
          <Location path="/about" handler={AboutPage} />
          <Location path="/terms-n-privacy" handler={TermsPage} />
          <Location path="/account/login" handler={AppLogin} {...this.props} />
          <Location path="/topics/:topicId/:slug" handler={Topic} />
          <Location path="/links/:linkId/:slug" handler={Story} />
          <NotFound handler={Dashboard} {...this.state} />
        </Locations>
      </Template>
    );
  }

  handleUrlChange(...args) {
    this.setState({ url: args[2] });
  }
}

export default App;
