import React from "react";

import { TagLink } from "app-link";
import CategoryStore from "stores/category-store";

import { fetchAllTags } from "actions/tag-actions";

class CategoryList extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleStoreChange = this.handleStoreChange.bind(this);

    this.state = {
      categories: CategoryStore.getAllCategories(),
    };
  }

  componentWillMount() {
    CategoryStore.addListener(this.handleStoreChange);
  }

  componentWillUnmount() {}

  componentDidMount() {
    if (this.state.categories.length === 0) fetchAllTags();
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
              "group"
            )}
          </div>
        </div>
      </div>
    );
  }

  _wrap(categories, className) {
    if (!categories) return <div />;

    return categories.map((item, index) => (
      <span key={index} className={className}>
        <TagLink className="category-link" link={item}>
          {item.name}
        </TagLink>
        <div className="category-group">
          {this._wrap(
            this._childrenOf(this.state.categories, item.id),
            "child"
          )}
        </div>
      </span>
    ));
  }

  _childrenOf(categories, parentId) {
    const children = categories.reduce((reduced, item) => {
      if (item.parent_id === parentId) reduced.push(item);
      return reduced;
    }, []);
    return children;
  }

  handleStoreChange() {
    const categories = CategoryStore.getAllCategories();
    if (categories) {
      this.setState({ categories });
    }
  }
}

export default CategoryList;
