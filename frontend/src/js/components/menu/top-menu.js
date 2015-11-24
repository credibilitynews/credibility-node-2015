
'use strict';
import React from 'react';
import {Link} from 'react-router-component';

// import {ReactIntlMixin as ReactIntlMixin} from "react-intl";

class TopMenu extends React.Component {
    render() {
        return (
            <div className="top-menu">
                <ul className="nav nav-pills">
                    <li className="nav-item">Tags: </li>
                    {this._wrap(this.props.items)}
                </ul>
            </div>);
    }

    _wrap(items) {
        return items.map(function(item){
            return (
                <li key={item.label} className="nav-item">
                    <Link href={item.path}>{item.label}</Link>
                </li>);
        });
    }
}

TopMenu.defaultProps = {
    items: [
        {path: '#/topic', label: 'USA'},
        {path: '#/topic', label: 'Ukraine'},
        {path: '#/topic', label: 'Hong Kong'},
        {path: '#/topic', label: 'Thailand'}
    ]
};

module.exports = TopMenu;
