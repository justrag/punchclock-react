import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers/';
import Layout from './components/Layout';
import './styles.css';
import 'font-awesome/css/font-awesome.css';

const store = createStore(reducer);

const App = () => (
  <Provider store={store}>
      <Layout />
  </Provider>
);

ReactDOM.render(<App />, document.getElementById('root'));
