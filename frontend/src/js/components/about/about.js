'use strict';
import React from 'react';

class AboutPage extends React.Component {
    shouldComponentUpdate(){
        return false;
    }
    render() {
        return (
            <div className="about-page">
                <div className="line">
                    <h1>About</h1>
                    <blockquote>"Read both sides of the story"</blockquote>
                    <p>
                        In this information overloaded age, news/articles are written and published by human authors. Aside from reporting facts, writings sometimes can be biased and opinionated, or even made up for some hidden agenda. We should always investigate the source of information, and to understand a topic better, we shall view things from different perspectives/sides.
                    </p>
                    <p>
                        <strong>Credibility</strong> project aims to contribute a space on the Internet to collect different stories from different perspectives/sides on controversial topics. Using technology, the project will be developed with more tools to ease the process of reviewing and overviewing articles, topics, publishers, and related parties.
                    </p>
                </div>
                <div className="line">
                    <h2>Story</h2>
                    <p>
                        This project was started since 2013, after learning the news of <a href="https://en.wikipedia.org/wiki/Aaron_Swartz">Aaron Swartz</a>. This is a project specially tribute to him, for his contribution, inspiration to the Internet and human mankind.
                    </p>
                </div>
                <div className="line">
                    <h2>Development</h2>
                    <p>
                        Credits to open source software community, this project is built on top of the following software stack:
                    </p>
                    <p>
                        <ul>
                            <li><a href="https://nodejs.org/">nodejs</a></li>
                            <li><a href="http://expressjs.com/">strongloop/expressjs</a></li>
                            <li><a href="https://netflix.github.io/falcor/">netflix/falcorjs</a></li>
                            <li><a href="https://passwordless.net/">florianheinemann/passwordless</a></li>
                            <li><a href="http://browserify.org/">browserify</a></li>
                            <li><a href="https://babeljs.io/">babel/babel</a></li>
                            <li><a href="https://facebook.github.io/react/">facebook/reactjs</a></li>
                        </ul>
                        <p>If you would like to contribute, please feel free to write us an email.</p>
                    </p>
                </div>
            </div>
        );
    }
}

module.exports = AboutPage;
