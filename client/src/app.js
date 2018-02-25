// npm packages
import React from 'react';
import {RingLoader} from 'react-spinners';
import {Button} from 'muicss/react';

import 'muicss/dist/css/mui.min.css';

const MainApp = () => (
  <div>
    <Button varaint="raised" color="primary">
      Jenkins Client
    </Button>
    <RingLoader loading color="#4A90E2" />
  </div>
);

export default MainApp;
