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
                    <p>
                        <strong>Credibility</strong> project is started since 2013, after learning the news of <a href="https://en.wikipedia.org/wiki/Aaron_Swartz">Aaron Swartz</a>. This is a project specially tribute to him, for his contribution, inspiration to the Internet and human mankind.
                    </p>
                    <blockquote>"Read both sides of the story"</blockquote>
                    <p>
                        This is an information overloaded age. We must remember that articles and news are written and published by human authors. Aside from reporting the facts, writings sometimes can be biased and opinionated, or even made out for some hidden agenda. We should always investigate the source of information, and read news from different sides to understand better.
                    </p>
                    <p>
                        This project aims to contribute a space on the Internet to collect different stories from  different perspectives/sides on controversial topics. Using technology, the project shall grow with more tools to ease the process of reviewing and overviewing various topics and articles and publishers.
                    </p>
                </div>

            </div>
        );
    }
}

module.exports = AboutPage;
