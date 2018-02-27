// our packages
import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';

// our packages
import appRoutes from '../../../routes/app';

import './content.styl';

const switchRoutes = (
  <Switch>
    {appRoutes.map(
      prop =>
        prop.redirect ? (
          <Redirect from={prop.path} to={prop.to} key={prop.key} />
        ) : (
          <Route path={prop.path} component={prop.component} key={prop.key} />
        )
    )}
  </Switch>
);

const Content = () => (
  <div id="content-wrapper">
    <div className="mui--appbar-height" />
    <div className="mui-container-fluid">{switchRoutes}</div>
  </div>
);

export default Content;
