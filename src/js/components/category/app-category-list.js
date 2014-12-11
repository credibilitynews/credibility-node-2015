/** @jsx React.DOM */
var React = require('react'),
    CategoryLink = require('./app-category-link');

var CategoryList = React.createClass({
    getDefaultProps: function() {
        return {
            categories: [1, 2, 3, 4, 5]
        };
    },
    render: function() {
        return (
            <div className="category-list">
                <h4>Categories</h4>
                <ul>
                    {this._wrap(this.props.categories)}
                </ul>
            </div>
        );
    },
    _wrap: function(categories){
        return categories
        .map(function(item){
            return (
                <li key={item.id}>
                    <CategoryLink category={item}/>
                    { (item.children ? <ul>{this._wrap(item.children)}</ul> : "") }
                </li>)
        }.bind(this));
    }

});

module.exports = CategoryList;
