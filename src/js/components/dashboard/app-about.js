/** @jsx React.DOM */
var React = require('react');

var About = React.createClass({
    getDefaultProps: function() {
        return {
            text: (
                <div>
                    <h4>About Credibility.io</h4>
                    <p>Read both sides stories.</p>
                    <p>Submit articles you read from different sources/perspectives and share your thoughts to the world.</p>
                    <p>We facilitate the discovery of what should be mattered.</p>
                </div>)
        };
    },
    render: function() {
        return (
            <div className="about panel panel-default">
                <div className="panel-body">
                {this.props.text}
                </div>
            </div>
        );
    }
})

module.exports = About;
