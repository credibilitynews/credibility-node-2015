import React from 'react';

class Score extends React.Component {
  render() {
    const style = { marginRight: '5px' };
    return (
      <span className="label label-warning">
        <span className="glyphicon glyphicon-certificate" style={style} />
        {this.props.score}
      </span>
    );
  }
}

export default Score;
