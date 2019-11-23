import './Message.scss';
import React from 'react';
import parseText from './parseText';

export function Message({ data: messageData, showArrow }) {
  const {
    text,
    isUser,
    showDate = true,
    date,
    data = {},
  } = messageData;
  const dngHtml = { __html: parseText(text) };
  let messageClass = 'message';
  if (showArrow) {
    messageClass += ' show-arrow';
  }
  if (isUser) {
    messageClass += ' user';
  }
  const dateTxt = `${date.getHours() + 1}:${date.getMinutes() + 1}`;
  return (
    <div className={messageClass}>
      <div className="content">
        <span className="content-text" dangerouslySetInnerHTML={dngHtml}></span>
        {showDate ? <span className="date">{dateTxt}</span> : null}
      </div>
    </div>
  );
}
