import React from 'react';

const Header: React.FC<{}> = () => (
  <footer
    className="background-theme"
    style={{
      width: '100%', backgroundColor: '#131b58', minHeight: '15vh', padding: '20px',
    }}
  >
    <div className="row">
      <div className="col-12 col-md-6">
        <p className="text-center text-white">
          Made With
          <i className="fa fa-heart text-danger" />
          {' '}
          and JS
        </p>
      </div>
      <div className="col-12 col-md-6">
        <p className="text-center text-white">
          <a href="https://github.com/BharatNischal/Bookmark-Store" target="_blank" rel="noreferrer">
            <i className="fa fa-star" />
            {' '}
            the
            {' '}
            <i className="fa fa-github" />
            {' '}
            Repo
          </a>
        </p>
      </div>
    </div>
  </footer>
);

export default Header;
