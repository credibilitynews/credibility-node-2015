import React from "react";
import Activity from "components/activity/activity";

import LinkActions from "actions/link-actions";
import TagLinksStore from "stores/tag-links-store";

class List extends React.Component {
  constructor(props, context) {
    super(props, context);
    this._listeners = [];
    this.handleStoreChange = this.handleStoreChange.bind(this);

    this.state = {
      articles: TagLinksStore.getAllLinks(props.tagId),
    };
  }

  componentWillMount() {
    this._listeners.push(TagLinksStore.addListener(this.handleStoreChange));
  }

  componentWillUnMount() {
    this._listeners.forEach((listener) => listener.remove());
    delete this._listeners;
  }

  componentDidMount() {
    if (this.state.articles.length === 0)
      LinkActions.fetchTagLinks(this.props.tagId);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.tagId != nextProps.tagId) {
      LinkActions.fetchTagLinks(nextProps.tagId);
    }
  }

  render() {
    return (
      <div className="activity-list row">
        <div className="col-xs-12">
          <h1>
            News Update:{" "}
            {this.state.articles && this.state.articles.length > 0 ? (
              this.state.articles[0].tag_name
            ) : (
              <div />
            )}
          </h1>
        </div>
        <div className="col-xs-12">{this.renderLinks(this.state.articles)}</div>
      </div>
    );
  }

  renderLinks(items) {
    return items.map((item, index) => (
      <div key={index} className="activity-list-item">
        <div className="content">
          <Activity key={item.id} article={item} />
        </div>
      </div>
    ));
  }

  handleStoreChange() {
    // console.log('handleStoreChange')
    this.setState({
      articles: TagLinksStore.getAllLinks(this.props.tagId),
    });
  }
}

export default List;
