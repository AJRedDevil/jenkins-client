// npm packages
import React from 'react';

// our packages
import './header.styl';

const Header = ({toggleSideBar}) => (
  <header id="header">
    <div className="mui-appbar mui--appbar-line-height">
      <div className="mui-container-fluid">
        <a
          className="sidedrawer-toggle mui--hidden-xs mui--hidden-sm"
          onClick={toggleSideBar}
        >
          ☰
        </a>
        <span className="mui--text-title mui--visible-xs-inline-block">
          LP Jenkins Client
        </span>
      </div>
    </div>
  </header>
);

export default Header;
