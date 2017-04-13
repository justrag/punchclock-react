import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
//import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
//import remoteResourceMiddleware from '../node_modules/redux-remote-resource/lib';
import remoteResourceMiddleware from 'redux-remote-resource';
import reducer from './reducers/';
import clockTickMiddleware from './middlewares/clockTick';
import bruteLoggerMiddleware from './middlewares/logger';
import { clockTick } from './actions/';
import Layout from './components/Layout';
import './styles.css';
import 'font-awesome/css/font-awesome.css';

// https://github.com/zalmoxisus/redux-devtools-extension
// not https://github.com/gaearon/redux-devtools
/*
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(
    applyMiddleware(remoteResourceMiddleware(), reduxImmutableStateInvariant(), clockTickMiddleware),
  ));
*/
// Or like this, to force REDUX_DEVTOOLS to the end - but probably for DEV only?
const enhancer = applyMiddleware(remoteResourceMiddleware(), bruteLoggerMiddleware, reduxImmutableStateInvariant(), clockTickMiddleware);
const composeEnhancer = compose(enhancer, window.__REDUX_DEVTOOLS_EXTENSION__());
const store = createStore(reducer, composeEnhancer);

/*
const store = createStore(reducer, composeWithDevTools(
    applyMiddleware(remoteResourceMiddleware(), reduxImmutableStateInvariant(), clockTickMiddleware),
  ));
*/

/*
const store = createStore(reducer, composeWithDevTools(
    autoRehydrate(),
    applyMiddleware(apiMiddleware, reduxImmutableStateInvariant()),
  ));
*/

const App = () => (
  <Provider store={store}>
      <Layout />
  </Provider>
);

setInterval(() => store.dispatch(clockTick()), 5000);

ReactDOM.render(<App />, document.getElementById('root'));

/*
// with a global configuration
const middlewares = applyMiddleware(remoteResourceMiddleware({
  // automatically injected into *every* request made with the middleware,
  // but can be overridden on a call-by-call basis
  injectedHeaders: {
    'x-access-token': localStorage.get('authtoken'),
    'Accept': 'application/json'
  },
  // causes these the designated actions to run for each response with the
  // given status code, completely bypassing normal lifecycle hooks shown below
  statusActions: {
    // primitive values are dispatched as action types
    419: // Authentication Timeout (non-official)
      actionTypes.SESSION_EXPIRED
    // also accepts functions that are called w/ a dispatch fn and the response
    419: (dispatch, res) => dispatch(actions.sessionTimeout())
  }
}));
*/