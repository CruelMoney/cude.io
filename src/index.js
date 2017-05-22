import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'  
import routes from './routes';
import reducers from './reducers';
import { ReduxAsyncConnect } from 'redux-connect';
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import registerServiceWorker from './registerServiceWorker';
import './index.scss';

// This value is rendered into the DOM by the server
const initialState = window.__INITIAL_STATE;

// Create store with the initial state generated by the server
const reduxMiddleware = applyMiddleware(thunkMiddleware, createLogger())
// const store = createStore(reducers, initialState);
const store = createStore(reducers, initialState, reduxMiddleware);

ReactDOM.render(
  <Provider store={store}>
    <Router
      routes={routes}
      history={browserHistory}
    />
  </Provider>,
  document.getElementById('app')
);
registerServiceWorker();
