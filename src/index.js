import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
//import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import remoteResourceMiddleware from 'redux-remote-resource';
//import remoteResourceMiddleware from 'redux-remote-resource';
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
