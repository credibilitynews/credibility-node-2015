var React = require('react'),

    CategoryLink = require('components/category/category-link'),
    CategoryStore = require('stores/category-store'),

    TagActions = require('actions/tag-actions');

var CategoryList = React.createClass({
    getInitialState: function() {
        return {
            categories: CategoryStore.getAllCategories()
        };
    },
    componentWillMount: function(){
        CategoryStore.addChangeListener(this._handleStoreChange);
    },
    componentWillUnmount: function(){
        CategoryStore.removeChangeListener(this._handleStoreChange);
    },
    componentDidMount: function(){
        TagActions.fetchAllTags();
    },

    render: function() {
        //console.log(this.state.categories);
        return (
            <div className="category-list panel panel-default">
                <div className="panel-body">
                    <h4>Categories</h4>
                    <div>
                        {this._wrap(
                            this._childrenOf(this.state.categories, undefined),
                            'group')}
                    </div>
                </div>
            </div>
        );
    },

    _wrap: function(categories, className){
        if(!categories) return <div />;

        return categories
            .map(function(item, index){
                return (
                    <span key={index} className={className}>
                        <CategoryLink category={item}/>
                        <span>
                            { this._wrap(
                                this._childrenOf(this.state.categories, item.id),
                                "child")}
                        </span>
                    </span>)
            }.bind(this));
    },
    _childrenOf: function(categories, parentId){
        var children = categories.reduce(function(reduced, item){
                if(item.parent_id == parentId)
                    reduced.push(item);
                return reduced;
            }, []);
        return children;
    },
    _handleStoreChange: function(){
        var categories = CategoryStore.getAllCategories();
        if(categories){
            this.setState({categories: categories});
        }
    }

});

module.exports = CategoryList;
