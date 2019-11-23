import './MessageArea.scss';
import React, { useContext } from 'react';
import { ChatContext } from '../ChatContext';
import { Message } from './Message/Message';

export function MessageArea() {
  const { messages } = useContext(ChatContext);
  return (
    <div className="message-area">
      {messages.map((message, index) => {
        const nextMessage = messages[index + 1];
        let showArrow = true;
        if (nextMessage) {
          showArrow = nextMessage.isUser !== message.isUser;
        }
        return <Message key={message.id} data={message} showArrow={showArrow} />;
      })}
    </div>
  );
}
