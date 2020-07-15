import React from 'react';

class Hashtag extends React.Component {
  _link(hashtag) {
    return `https://twitter.com/hashtag/${hashtag.slice(1)}`;
  }

  _split(hashtags) {
    return hashtags.split(' ').map(
      (tag) => (
        <span key={tag}>
          <a href={this._link(tag)}>{tag}</a>
&nbsp;
        </span>
      ),
    );
  }

  render() {
    return (
      <div className="tag" href="#">
        {this._split(this.props.tag)}
      </div>
    );
  }
}

Hashtag.defaultProps = {
  tag: '',
};

export default Hashtag;
