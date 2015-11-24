
var React = require('react');

class CategoryLink extends React.Component {
    render() {
        return (
            <a className="category-link" href={this._link(this.props.category)}>
                {this.props.category.name}
            </a>
        );
    }

    _link(category) {
        return "/categories/"+category.code;
    }
}

CategoryLink.defaultProps = {
    category: { title: "[Category Title]" }
};

module.exports = CategoryLink;
