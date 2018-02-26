// npm packages
import React from 'react';

// our packages
import Menu from './menu';

import './sidedrawer.styl';

const SideDrawer = props => (
  <div id="sidedrawer" className="mui--no-user-select">
    <div id="sidedrawer-brand" className="mui--appbar-line-height">
      <span className="mui--text-title">LP Jenkins Client</span>
    </div>
    <div className="mui-divider" />
    <ul>
      <Menu {...props} />
    </ul>
  </div>
);

export default SideDrawer;
