// npm packages
import React from 'react';
import ReactDOM from 'react-dom';
import Button from 'material-ui/Button';

const MainApp = () => (
  <Button variant="raised" color="primary">
    <h1>Hello, world!</h1>
  </Button>
);

ReactDOM.hydrate(<MainApp />, document.getElementById('rootNode'));
