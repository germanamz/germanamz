import './Message.scss';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAtom } from '@fortawesome/free-solid-svg-icons';

export function Message({ data: messageData, showArrow }) {
  const {
    text,
    isUser,
    showDate = true,
    date,
    data = {},
  } = messageData;
  const { loading } = data;
  let messageClass = 'message';
  if (showArrow) {
    messageClass += ' show-arrow';
  }
  if (isUser) {
    messageClass += ' user';
  }
  if (loading) {
    messageClass += ' loading';
  }
  const dateTxt = `${date.getHours() + 1}:${date.getMinutes() + 1}`;
  return (
    <div className={messageClass}>
      <div className="content">
        <span className="content-text">{text}</span>
        {showDate ? <span className="date">{dateTxt}</span> : null}
        {loading ? <FontAwesomeIcon icon={faAtom} spin /> : null}
      </div>
    </div>
  );
}
