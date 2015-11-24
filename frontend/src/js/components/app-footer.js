
"use strict";
var React = require('react');

class Footer extends React.Component {
    render() {
        return (
            <footer className="footer">
                <div className="text-right container-fluid">
                    <div className="copyright">some rights reserved</div>
                </div>
            </footer>
        );
    }
}

module.exports = Footer;
