/** @jsx React.DOM */
var React = require('react');

var ViewsNum = React.createClass({
    render: function() {
        var style = {"marginRight": "5px"};
        return (
            <span className="views-num label">
                <span className="glyphicon glyphicon-eye-open"></span>{this.props.views}
            </span>
        );
    }

});

module.exports = ViewsNum;
