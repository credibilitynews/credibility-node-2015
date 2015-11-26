'use strict';
import React from 'react';
import {Link} from 'react-router-component';

import {fetchTopTags} from 'actions/tag-actions';
import CategoryStore from 'stores/category-store';
import {preFetchable} from 'pre-fetchable';

class TopMenu extends React.Component {
    constructor(props, context) {
        super(props, context);
        this._handleStoreChange = this._handleStoreChange.bind(this);
        this.state = {
            items: CategoryStore.getTopCategories()
        }
    }

    componentWillMount() {
        CategoryStore.addChangeListener(this._handleStoreChange);
    }

    componentWillUnmount(){
        CategoryStore.removeChangeListener(this._handleStoreChange);
    }

    componentDidMount(){
        if(this.state.items.length == 0)
            fetchTopTags();
    }

    render() {
        return (
            <div className="top-menu">
                <ul className="nav nav-pills">
                    <li className="nav-item">Tags: </li>
                    {this.renderItem(this.state.items)}
                </ul>
            </div>);
    }

    renderItem(items) {
        return items.map(function(item){
            return (
                <li key={item.code} className="nav-item">
                    <Link href={`/tags/${item.id}/${item.code}`}>{item.name}</Link>
                </li>);
        });
    }

    _handleStoreChange(){
        console.log('_handleStoreChange', CategoryStore.getTopCategories())
        this.setState({items: CategoryStore.getTopCategories()})
    }
}

module.exports = preFetchable(
    TopMenu,
    fetchTopTags
);
