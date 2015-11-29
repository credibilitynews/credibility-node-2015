'use strict';
import React from 'react';

import {TagLink} from 'app-link';
import CategoryStore from 'stores/category-store';

import TagActions from 'actions/tag-actions';

import {preFetchable} from 'pre-fetchable';

class CategoryList extends React.Component {
    constructor(props, context) {
        super(props, context);
        this._handleStoreChange = this._handleStoreChange.bind(this);

        this.state = {
            categories: CategoryStore.getAllCategories()
        };
    }

    componentWillMount() {
        CategoryStore.addChangeListener(this._handleStoreChange);
    }

    componentWillUnmount() {
        CategoryStore.removeChangeListener(this._handleStoreChange);
    }

    componentDidMount() {
        // if(this.state.categories.length == 0)
        //     TagActions.fetchAllTags();
    }

    render() {
        // console.log(this.props, this.state);
        return (
            <div className="category-list panel panel-default">
                <div className="panel-body">
                    <h2>Categories</h2>
                    <div>
                        {this._wrap(
                            this._childrenOf(this.state.categories, undefined),
                            'group')}
                    </div>
                </div>
            </div>
        );
    }

    _wrap(categories, className) {
        if(!categories) return <div />;

        return categories
            .map((item, index) => {
                return (
                    <span key={index} className={className}>
                        <TagLink className="category-link" link={item}>{item.name}</TagLink>
                        <div className="category-group">
                            { this._wrap(
                                this._childrenOf(this.state.categories, item.id),
                                'child')}
                        </div>
                    </span>);
            });
    }

    _childrenOf(categories, parentId) {
        var children = categories.reduce(function(reduced, item){
            if(item.parent_id == parentId)
                reduced.push(item);
            return reduced;
        }, []);
        return children;
    }

    _handleStoreChange() {
        var categories = CategoryStore.getAllCategories();
        if(categories){
            this.setState({categories: categories});
        }
    }
}

module.exports = preFetchable(
    CategoryList,
    TagActions.fetchAllTags
);
