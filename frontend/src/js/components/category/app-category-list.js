
var React = require('react'),
    CategoryLink = require('./app-category-link'),
    TagActions = require('../../actions/tag-actions');

var CategoryList = React.createClass({
    getDefaultProps: function() {
        return {
            categories: []
        };
    },
    render: function() {
        return (
            <div className="category-list panel panel-default">
                <div className="panel-body">
                    <h4>Categories</h4>
                    <div>
                        {this._wrap(this.props.categories, 'group')}
                    </div>
                </div>
            </div>
        );
    },
    _wrap: function(categories, className){
        return categories
        .map(function(item, index){
            return (
                <span key={index} className={className}>
                    <CategoryLink category={item}/>
                    { (item.children ? <span>{this._wrap(item.children, "child")}</span> : "") }
                </span>)
        }.bind(this));
    }

});

module.exports = CategoryList;
