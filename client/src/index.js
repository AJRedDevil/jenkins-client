// npm packages
import React from 'react';
import ReactDOM from 'react-dom';
import createHistory from 'history/createBrowserHistory';
// eslint-disable-next-line no-unused-vars
import rxjs from 'rxjs';
import {Provider} from 'react-redux';
import {ConnectedRouter as Router} from 'react-router-redux';

// our packages
import App from './scenes/Base';
import configureStore from './services/store';

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory();

const MainApp = () => (
  <Provider store={configureStore(history)}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>
);

ReactDOM.hydrate(<MainApp />, document.getElementById('rootNode'));
