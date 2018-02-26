// our packages
import React from 'react';
import {Route, Switch} from 'react-router-dom';

// our packages
import Home from '../../Home';
import Settings from '../../Settings';

import './content.styl';

const Content = () => (
  <div id="content-wrapper">
    <div className="mui--appbar-height" />
    <div className="mui-container-fluid">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/settings" component={Settings} />
      </Switch>
    </div>
  </div>
);

export default Content;
