/** @jsx React.DOM */
var React = require('react');

var ViewsNum = React.createClass({
    getDefaultProps: function() {
        return {
            text: false
        };
    },
    render: function() {
        return (
            <span className="views-num label">
                {this.props.text ? this.props.views : <span className="glyphicon glyphicon-eye-open"></span>}
                {this.props.text ? <span className="text">Views</span> : this.props.views}
            </span>
        );
    }

});

module.exports = ViewsNum;
