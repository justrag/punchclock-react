import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import reducer from './reducers/';
import clockTickMiddleware from './middlewares/clockTick';
import { clockTick } from './actions/';
import Layout from './components/Layout';
import './styles.css';
import 'font-awesome/css/font-awesome.css';

const store = createStore(reducer, composeWithDevTools(
    applyMiddleware(reduxImmutableStateInvariant(), clockTickMiddleware),
  ));

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
