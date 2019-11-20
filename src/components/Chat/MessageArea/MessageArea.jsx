import './MessageArea.scss';
import React from 'react';
import { ChatContext } from '../ChatContext';
import { Message } from './Message/Message';

export function MessageArea() {
  const render = ({ messages }) => (
    <div className="message-area">
      {messages.map((message, index) => {
        const nextMessage = messages[index + 1];
        let showArrow = true;
        if (nextMessage) {
          showArrow = nextMessage.isUsers !== message.isUsers;
        }
        return <Message key={message.id} data={message} showArrow={showArrow} />;
      })}
    </div>
  );
  return (
    <ChatContext.Consumer>
      {render}
    </ChatContext.Consumer>
  );
}
