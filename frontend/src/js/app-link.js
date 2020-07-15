import React from 'react';
import { Link } from 'react-router-component';
import slug from 'slug';

export class TagLink extends React.Component {
  render() {
    const title = this.props.link ? this.props.link.code : this.props.code;
    const id = this.props.link ? this.props.link.id : this.props.id;

    return (
      <Link
        className={`${this.props.className} tag-title`}
        href={`/tags/${id}/${slug(title)}`}
      >
        {this.props.children}
      </Link>
    );
  }
}

export class TopicLink extends React.Component {
  render() {
    const title = this.props.link ? this.props.link.title : this.props.title;
    const id = this.props.link ? this.props.link.id : this.props.id;

    return (
      <Link
        className={`${this.props.className} topic-title`}
        href={`/topics/${id}/${slug(title)}`}
      >
        {this.props.children}
      </Link>
    );
  }
}

export class StoryLink extends React.Component {
  render() {
    const title = this.props.link ? this.props.link.title : this.props.title;
    const id = this.props.link ? this.props.link.id : this.props.id;

    return (
      <Link
        className={`${this.props.className} link-title`}
        href={`/stories/${id}/${slug(title)}`}
      >
        {this.props.children}
      </Link>
    );
  }
}
