var React = require('react'),

    CategoryLink = require('components/category/category-link'),
    CategoryStore = require('stores/category-store'),

    TagActions = require('actions/tag-actions');

TagActions.fetchAllTags();

class CategoryList extends React.Component {
    constructor(props, context) {
        super(props, context);
        this._handleStoreChange = this._handleStoreChange.bind(this);

        this.state = {
            categories: CategoryStore.getAllCategories()
        };
    }

    componentWillMount() {
        CategoryStore.addChangeListener(this._handleStoreChange);
    }

    componentWillUnmount() {
        CategoryStore.removeChangeListener(this._handleStoreChange);
    }

    componentDidMount() {
        if(this.state.categories.length == 0)
            TagActions.fetchAllTags();
    }

    render() {
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
    }

    _wrap(categories, className) {
        if(!categories) return <div />;

        return categories
            .map(function(item, index){
                return (
                    <span key={index} className={className}>
                        <CategoryLink category={item}/>
                        <span>
                            { this._wrap(
                                this._childrenOf(this.state.categories, item.id),
                                'child')}
                        </span>
                    </span>);
            }.bind(this));
    }

    _childrenOf(categories, parentId) {
        var children = categories.reduce(function(reduced, item){
            if(item.parent_id == parentId)
                reduced.push(item);
            return reduced;
        }, []);
        return children;
    }

    _handleStoreChange() {
        var categories = CategoryStore.getAllCategories();
        if(categories){
            this.setState({categories: categories});
        }
    }
}

module.exports = CategoryList;
