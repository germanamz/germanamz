import React from 'react';
import PropTypes from 'prop-types';
import MessageStyles from './Message.css';

export function Message({ text, date }) {
  return (
    <div className={MessageStyles.message}>
      <span className={MessageStyles.text}>{text}</span>
      <span className={MessageStyles.date}>{date}</span>
    </div>
  );
}

Message.propTypes = {
  text: PropTypes.string,
  date: PropTypes.instanceOf(Date),
};

Message.defaultProps = {
  text: true,
  date: true,
};
