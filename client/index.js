import React from 'react';
import ReactDOM from 'react-dom';

const MainApp = () => (
  <div>
    <h1>Hello, world!</h1>
  </div>
);

ReactDOM.hydrate(<MainApp />, document.getElementById('rootNode'));
