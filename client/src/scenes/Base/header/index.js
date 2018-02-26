// npm packages
import React from 'react';

// our packages
import './header.styl';

const Header = ({toggleSideBar}) => (
  <header id="header">
    <div className="mui-appbar mui--appbar-line-height">
      <div className="mui-container-fluid">
        <span
          className="sidedrawer-toggle mui--hidden-xs mui--hidden-sm"
          onClick={toggleSideBar}
        >
          ☰
        </span>
      </div>
    </div>
  </header>
);

export default Header;
