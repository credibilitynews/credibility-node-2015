
var React = require('react'),
    TopicLink = require('../topic/app-topic-link'),
    TopicStats = require('../stats/app-topic-stats'),
    merge = require('object.assign');

var Debates = React.createClass({
    getDefaultProps: function() {
        return {
            topics: []
        };
    },
    render: function() {
        //console.log("debates", this.props);
        return (
            <div>
                <h3>Ongoing Debates</h3>
                {this._wrap(this.props.topics)}
            </div>
        );
    },
    _wrap: function(items){
        return items.slice(0,5).map(function(item){
            return(
                <div key={item.id}>
                    <TopicStats topic={item}/>
                </div>);
        });
    }

});

module.exports = Debates;
