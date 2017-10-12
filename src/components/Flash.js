import React from 'react';
import { connect } from 'react-redux';
import { getFlashMessages } from '../selectors/';

const Message = ({ id, type, text }) =>
  <div className={type}>
    {text}
  </div>;

const Flash = ({ messages }) =>
  <div className="flash">
    {messages.map(m => <Message {...m} />)}
  </div>;

const mapStateToProps = state => ({
  messages: getFlashMessages(state)
});
export default connect(mapStateToProps)(Flash);
