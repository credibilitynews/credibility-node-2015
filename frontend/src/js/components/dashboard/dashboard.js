'use strict';
import React from 'react';

import About from 'components/dashboard/about.js';
import ActivityList from 'components/activity/activity-list';
import RecentTopics from 'components/dashboard/recent-topics';
import SearchBar from 'components/search/search-bar';
import CategoryList from 'components/category/category-list';
import TopMenu from 'components/menu/top-menu';

import TopicStore from 'stores/topic-store';
import CategoryStore from 'stores/category-store';
import LatestArticleStore from 'stores/latest-article-store';

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
