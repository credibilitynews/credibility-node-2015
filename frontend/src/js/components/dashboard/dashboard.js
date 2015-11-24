'use strict';
var React = require('react');

var About = require('components/dashboard/about.js'),
    ActivityList = require('components/activity/activity-list'),
    RecentTopics = require('components/dashboard/recent-topics'),
    SearchBar = require('components/search/search-bar'),
    CategoryList = require('components/category/category-list'),
    TopMenu = require('components/menu/top-menu');

var TopicStore = require('stores/topic-store'),
    CategoryStore = require('stores/category-store'),
    LatestArticleStore = require('stores/latest-article-store');

function getStatesFromStore(){
    var state = {
        topics: TopicStore.getAllTopics(),
        categories: CategoryStore.getAllCategories(),
        latest_articles: LatestArticleStore.getAllArticles()
    };
    return state;
}

class Dashboard extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = getStatesFromStore();
    }

    render() {
        return (
            <div className="row">
                <div className="col-xs-12 col-md-8">
                    <TopMenu />
                </div>
                <div className="col-xs-12 col-md-4">
                    <SearchBar />
                </div>

                <div className="col-sm-12 col-md-8">
                    <div className="row">
                        <div className="col-sm-12">
                            <ActivityList />
                        </div>
                        <div className="col-sm-12">

                        </div>
                    </div>
                </div>
                <div className="col-md-4 col-xs-12 right-sidebar">
                    <RecentTopics />
                    <CategoryList />
                    <About />
                </div>
            </div>
        );
    }

    _onChange() {
        this.setState(getStatesFromStore());
    }
}

module.exports = Dashboard;
