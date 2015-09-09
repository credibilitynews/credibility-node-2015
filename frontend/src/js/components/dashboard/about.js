
var React = require('react');

var About = React.createClass({
    getDefaultProps: function() {
        return {
            text: (
                <div>
                    <h4>Credibility.io</h4>
                    <blockquote>Read from different sides of the story.</blockquote>
                    <p><a>Submit</a> articles you read from different sources/perspectives and share your analysis.</p>
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
