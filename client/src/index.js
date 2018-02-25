// npm packages
import React from 'react';
import ReactDOM from 'react-dom';
import {Button} from 'muicss/react';

import 'muicss/dist/css/mui.min.css';

const MainApp = () => (
  <div>
    <Button varaint="raised" color="primary">
      Jenkins Client
    </Button>
  </div>
);

ReactDOM.hydrate(<MainApp />, document.getElementById('rootNode'));
