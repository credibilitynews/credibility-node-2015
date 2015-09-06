
var React = require('react'),
	Router = require('react-router-component'),
	Locations = Router.Locations,
	Location = Router.Location,
	NotFound = Router.NotFound;

var About = require('components/dashboard/app-about.js'),
	ActivityList = require('components/activity/app-activity-list'),
	Debates = require('components/dashboard/app-debates'),
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
				<div className="col-sm-12 col-md-9">
					<TopMenu />
					<SearchBar />
					<div className="row">
						<div className="col-sm-8">
							<ActivityList />
						</div>
						<div className="col-sm-4">
							<Debates />
						</div>
					</div>
				</div>
				<div className="col-sm-12 hidden-sm-up right-sidebar">
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
