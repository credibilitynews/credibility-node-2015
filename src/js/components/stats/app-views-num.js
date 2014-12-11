/** @jsx React.DOM */
var React = require('react');

var ViewsNum = React.createClass({

    render: function() {
        var style = {"marginRight": "5px"};
        return (
            <span className="label label-info">
                <span className="glyphicon glyphicon-eye-open" style={style}></span>{this.props.views}
            </span>
        );
    }

});

module.exports = ViewsNum;
