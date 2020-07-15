import React from "react";
import { TagLink } from "app-link";

import { fetchTopTags } from "actions/tag-actions";
import CategoryStore from "stores/category-store";
import { preFetchable } from "pre-fetchable";

class TopMenu extends React.Component {
  constructor(props, context) {
    super(props, context);
    this._listeners = [];
    this._handleStoreChange = this._handleStoreChange.bind(this);
    this.state = {
      items: CategoryStore.getTopCategories(),
    };
  }

  componentWillMount() {
    this._listeners.push(CategoryStore.addListener(this._handleStoreChange));
  }

  componentWillUnmount() {
    this._listeners.forEach((l) => l.remove());
  }

  componentDidMount() {
    if (this.state.items.length == 0) fetchTopTags();
  }

  render() {
    return (
      <div className="top-menu">
        <ul className="nav nav-pills">
          <li className="nav-item">Popular Tags: </li>
          {this.renderItem(this.state.items)}
        </ul>
      </div>
    );
  }

  renderItem(items) {
    return items.map((item) => (
      <li key={item.code} className="nav-item">
        <TagLink link={item}>{item.name}</TagLink>
      </li>
    ));
  }

  _handleStoreChange() {
    console.log("_handleStoreChange", CategoryStore.getTopCategories());
    this.setState({ items: CategoryStore.getTopCategories() });
  }
}

export default preFetchable(TopMenu, fetchTopTags);
