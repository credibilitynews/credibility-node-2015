
var React = require('react');

var About = React.createClass({
    getDefaultProps: function() {
        return {
            text: (
                <div>
                    <h4>About Credibility.io</h4>
                    <p>Read both sides of the story.</p>
                    <p>Stories from just one source might not give the whole picture. Stay exact and don't worship opinions </p>
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
