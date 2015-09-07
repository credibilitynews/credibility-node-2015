
var React = require('react'),
	Router = require('react-router-component'),
	Locations = Router.Locations,
	Location = Router.Location,
	NotFound = Router.NotFound;

var About = require('components/dashboard/app-about.js'),
	ActivityList = require('components/activity/app-activity-list'),
	RecentTopics = require('components/dashboard/app-recent-topics'),
	Stats = require('components/dashboard/app-stats'),
	SearchBar = require('components/search/app-search-bar'),
	CategoryList = require('components/category/app-category-list'),
	TopMenu = require('components/menu/app-top-menu');

var	TopicStore = require('stores/app-topic-store'),
	CategoryStore = require('stores/app-category-store'),
	LatestArticleStore = require('stores/app-latest-article-store');

function getStatesFromStore(){
	var state = {
		topics: TopicStore.getAllTopics(),
		categories: CategoryStore.getAllCategories(),
		latest_articles: LatestArticleStore.getAllArticles()
	}
	return state;
}

var Dashboard = React.createClass({
	getInitialState: function() {
		return getStatesFromStore();
	},
 	render: function(){
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
							<RecentTopics />
						</div>
					</div>
				</div>
				<div className="col-md-4 hidden-sm-down right-sidebar">
					<About />
					<CategoryList />
					<Stats />
				</div>
			</div>
		)
	},

	_onChange: function(){
		this.setState(getStatesFromStore())
	}
});

module.exports = Dashboard;
