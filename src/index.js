import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import reducer from './reducers/';
import Layout from './components/Layout';
import './styles.css';
import 'font-awesome/css/font-awesome.css';

const store = createStore(reducer, composeWithDevTools(
    applyMiddleware(reduxImmutableStateInvariant()),
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

ReactDOM.render(<App />, document.getElementById('root'));
