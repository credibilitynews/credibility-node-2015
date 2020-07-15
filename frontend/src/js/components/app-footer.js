import React from 'react';
import { Link } from 'react-router-component';

class Footer extends React.Component {
  render() {
    return (
      <footer className="footer">
        <div className="text-right container">
          <Link href="/about">About</Link>
          {' '}
          |
          {' '}
          <Link href="/terms-n-privacy">Privacy &amp; Terms</Link>
          {' '}
          |
          {' '}
          <Link
            rel="license"
            href="http://creativecommons.org/licenses/by/3.0/deed.en_US"
          >
            <img
              alt="Creative Commons License"
              style={{ borderWidth: 0 }}
              src="http://i.creativecommons.org/l/by/3.0/80x15.png"
            />
          </Link>
        </div>
      </footer>
    );
  }
}

export default Footer;
