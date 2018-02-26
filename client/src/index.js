// npm packages
import React from 'react';
import ReactDOM from 'react-dom';
// eslint-disable-next-line no-unused-vars
import rxjs from 'rxjs';
import {Provider} from 'react-redux';

// our packages
import App from './app';
import configureStore from './services/store';

const MainApp = () => (
  <Provider store={configureStore()}>
    <div id="full">
      <App />
    </div>
  </Provider>
);

ReactDOM.hydrate(<MainApp />, document.getElementById('rootNode'));
