
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
                {this.props.views} views
            </span>
        );
    }

});

module.exports = ViewsNum;
