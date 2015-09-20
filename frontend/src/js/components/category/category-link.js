
var React = require('react');

var CategoryLink = React.createClass({
    getDefaultProps: function() {
        return {
            category: { title: "[Category Title]" }
        };
    },
    render: function() {
        return (
            <a className="category-link" href={this._link(this.props.category)}>
                {this.props.category.name}
            </a>
        );
    },
    _link: function(category){
        return "/categories/"+category.code;
    }

});

module.exports = CategoryLink;
