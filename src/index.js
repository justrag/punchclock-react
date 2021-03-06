import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
//import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import thunk from 'redux-thunk';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import remoteResourceMiddleware from 'redux-remote-resource';
import clockTickMiddleware from './middlewares/clockTick';
import bruteLoggerMiddleware from './middlewares/logger';
import flashMiddleware from './middlewares/flash';
import { persistStore, autoRehydrate } from 'redux-persist';
import reducer from './reducers/';
import { getUserToken } from './selectors/';
import { clockTick, logOut } from './actions/';
import Layout from './components/Layout';
import './styles.css';
import 'font-awesome/css/font-awesome.css';

const RRM = remoteResourceMiddleware({
  injectedHeaders: {
    Accept: 'application/json',
    Authorization: state => {
      if (getUserToken(state)) {
        return `Bearer ${getUserToken(state)}`;
      } else {
        return undefined;
      }
    }
  },
  statusActions: {
    401: logOut
  }
});
const enhancer = applyMiddleware(
  RRM,
  thunk,
  bruteLoggerMiddleware,
  reduxImmutableStateInvariant(),
  clockTickMiddleware,
  flashMiddleware
);

// https://github.com/zalmoxisus/redux-devtools-extension
// not https://github.com/gaearon/redux-devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const composeEnhancer = composeEnhancers(enhancer, autoRehydrate());
const store = createStore(reducer, composeEnhancer);
persistStore(store);

const App = () =>
  <Provider store={store}>
    <Layout />
  </Provider>;

setInterval(() => store.dispatch(clockTick()), 50000);

ReactDOM.render(<App />, document.getElementById('root'));
