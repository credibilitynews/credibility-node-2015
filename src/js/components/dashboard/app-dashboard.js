/** @jsx React.DOM */
var React = require('react');

var About = require('./app-about.js'),
	Updates = require('../activity/app-activity-list'),
	Debates = require('./app-debates'),
	Stats = require('./app-stats'),
	SearchBar = require('../search/app-search-bar'),
	CategoryList = require('../category/app-category-list'),
	TopMenu = require('../menu/app-top-menu');

var ServerActions = require('../../actions/app-server-actions');

var	TopicStore = require('../../stores/app-topic-store'),
	CategoryStore = require('../../stores/app-category-store'),
	LatestArticleStore = require('../../stores/app-latest-article-store');

function getStatesFromServer(){
	return {
		topics: [],
		categories: [],
		latest_articles: []
	}
}

function getStatesFromStore(){
	var state = {
		topics: TopicStore.getAllTopics(),
		categories: CategoryStore.getAllCategories(),
		latest_articles: LatestArticleStore.getAllArticles()
	}
	console.log(state);
	return state;
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
	componentDidMount: function() {
		ServerActions.fetchLayout();
	},
 	render: function(){
		return (
			<div className="row">
				<div className="col-sm-9 col-xs-12">
					<TopMenu />
					<SearchBar />
					<div className="row">
						<div className="col-md-8">
							<Debates topics={this.state.topics}/>
						</div>
						<div className="col-md-4">
							<Updates articles={this.state.latest_articles}/>
						</div>

					</div>

				</div>
				<div className="col-sm-3 hidden-xs right-sidebar">
					<About />
					<CategoryList categories={this.state.categories}/>
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
