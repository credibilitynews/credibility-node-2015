/** @jsx React.DOM */
var React = require('react');

var Explain = require('./app-explain.js'),
	LatestTopics = require('./app-latest-topics'),
	Updates = require('../activity/app-activity-list'),
	Stats = require('./app-stats'),
	SearchBar = require('../search/app-search-bar'),
	CategoryList = require('../category/app-category-list');

var ServerActions = require('../../actions/app-server-actions'),
	TopicStore = require('../../stores/app-topic-store'),
	CategoryStore = require('../../stores/app-category-store'),
	LatestArticleStore = require('../../stores/app-latest-article-store');

function getStatesFromServer(){
	ServerActions.fetchLayout();
	return {
		topics: [],
		categories: [],
		latest_articles: []
	}
}

function getStatesFromStore(){
	return {
		topics: TopicStore.getAllTopics(),
		categories: CategoryStore.getAllCategories(),
		latest_articles: LatestArticleStore.getAllArticles()
	}
}


var Dashboard = React.createClass({
	getInitialState: function() {
		return getStatesFromServer();
	},
	componentWillMount: function() {
		//TopicStore.addChangeListener(this._onChange);
		//CategoryStore.addChangeListener(this._onChange);
		LatestArticleStore.addChangeListener(this._onChange);
	},
 	render: function(){
		return (
			<div className="row">
				<div className="col-sm-9">
					<SearchBar />
					<div className="row">
						<div className="col-md-7"><Updates articles={this.state.latest_articles}/></div>
						<div className="col-md-5"><LatestTopics topics={this.state.topics}/></div>
					</div>
					<Stats />
				</div>
				<div className="col-sm-3">
					<Explain />
					<h3>Categories</h3>
					<CategoryList categories={this.state.categories}/>
				</div>
			</div>
		)
	},

	_onChange: function(){
		this.setState(getStatesFromStore())
	}
});

module.exports = Dashboard;
