import React from 'react';

class ViewsNum extends React.Component {
  render() {
    return (
      <span className="views-num label">
        {this.props.views}
        {' '}
        views
      </span>
    );
  }
}

ViewsNum.defaultProps = {
  text: false,
};

export default ViewsNum;
