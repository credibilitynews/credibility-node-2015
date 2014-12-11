/** @jsx React.DOM */
var React = require('react');

var CategoryLink = React.createClass({
    getDefaultProps: function() {
        return {
            category: { title: "[Category Title]" }
        };
    },
    render: function() {
        return (
            <div>
                <a href={this._link(this.props.category)}>
                    {this.props.category.name}
                </a>
            </div>
        );
    },
    _link: function(category){
        return "/#categories/"+category.code;
    }

});

module.exports = CategoryLink;
