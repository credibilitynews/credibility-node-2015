import React from "react";
import { TagLink } from "app-link";

import { fetchTopTags } from "actions/tag-actions";
import CategoryStore from "stores/category-store";

class TopMenu extends React.Component {
  constructor(props, context) {
    super(props, context);
    this._listeners = [];
    this.handleStoreChange = this.handleStoreChange.bind(this);
    this.state = {
      items: CategoryStore.getTopCategories(),
    };
  }

  componentWillMount() {
    this._listeners.push(CategoryStore.addListener(this.handleStoreChange));
  }

  componentWillUnmount() {
    this._listeners.forEach((l) => l.remove());
  }

  componentDidMount() {
    if (this.state.items.length === 0) fetchTopTags();
  }

  render() {
    return (
      <div className="top-menu">
        <ul className="nav nav-pills">
          <li className="nav-item nav-link">Popular Tags: </li>
          {this.renderItem(this.state.items)}
        </ul>
      </div>
    );
  }

  renderItem(items) {
    return items.map((item) => (
      <li key={item.code} className="nav-item nav-link">
        <TagLink link={item}>{item.name}</TagLink>
      </li>
    ));
  }

  handleStoreChange() {
    // console.log("handleStoreChange", CategoryStore.getTopCategories());
    this.setState({ items: CategoryStore.getTopCategories() });
  }
}

export default TopMenu;
