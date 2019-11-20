import './Message.scss';
import React from 'react';

export function Message({ data: messageData, showArrow }) {
  const { text, isUsers, date } = messageData;
  let messageClass = 'message';
  if (showArrow) {
    messageClass += ' show-arrow';
  }
  if (isUsers) {
    messageClass += ' user';
  }
  const dateTxt = `${date.getHours() + 1}:${date.getMinutes() + 1}`;
  return (
    <div className={messageClass}>
      <div className="content">
        <span className="content-text">{text}</span>
        <span className="date">{dateTxt}</span>
      </div>
    </div>
  );
}
