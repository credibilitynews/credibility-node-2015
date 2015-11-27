
'use strict';
import React from 'react';
import {Link} from 'react-router-component';

class CategoryLink extends React.Component {
    render() {
        return (
            <Link href={this._link(this.props.category)}>
                {this.props.category.name}
            </Link>
        );
    }

    _link(category) {
        return `/tags/${category.id}/${category.code}`;
    }
}

CategoryLink.defaultProps = {
    category: { title: '[Category Title]' }
};

module.exports = CategoryLink;
