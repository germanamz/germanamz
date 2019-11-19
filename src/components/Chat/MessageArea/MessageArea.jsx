import './MessageArea.scss';
import React from 'react';
import { ChatContext } from '../ChatContext';
import { Message } from './Message/Message';

export function MessageArea() {
  const render = ({ messages }) => (
    <div className="message-area">
      {messages.map(message => <Message key={message.id} data={message} />)}
    </div>
  );
  return (
    <ChatContext.Consumer>
      {render}
    </ChatContext.Consumer>
  );
}
