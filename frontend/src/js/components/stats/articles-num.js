
'use strict';
import React from 'react';

class ArticlesNum extends React.Component {
    render() {
        return (
            <span className="articles-num label">
                {this.props.text ? this.props.articles : <i className="fa fa-file-text-o"></i>}
                {this.props.text ? <span className="text">Articles</span> : this.props.articles}
            </span>
        );
    }
}

ArticlesNum.defaultProps = {
    text: false
};

module.exports = ArticlesNum;
