import React from 'react';
import { connect } from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { getFlashMessages } from '../selectors/';

const Message = ({ id, type, text }) =>
  <p key={id} className={type}>
    {text}
  </p>;

// synchronize transitionEnterTimeout and transitionLeaveTimeout
// here and in CSS
const Flash = ({ messages }) =>
  <div className="flash">
    <ReactCSSTransitionGroup
      transitionName="flash"
      transitionEnterTimeout={1000}
      transitionLeaveTimeout={2000}
    >
      {messages.map(m => <Message {...m} />)}
    </ReactCSSTransitionGroup>
  </div>;

const mapStateToProps = state => ({
  messages: getFlashMessages(state)
});
export default connect(mapStateToProps)(Flash);
