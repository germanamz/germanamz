import './MessageArea.scss';
import React, { useContext } from 'react';
import { ChatContext } from '../ChatContext';
import { Message } from './Message/Message';

export function MessageArea() {
  const { messages, botIsWriting } = useContext(ChatContext);
  const messagesToRender = [ ...messages ];
  if (botIsWriting()) {
    const loadingMessage = {
      text: '',
      isUser: false,
      showDate: false,
      date: new Date(),
      data: {
        loading: true,
      },
    };
    const pushedLength = messagesToRender.push(loadingMessage);
    loadingMessage.id = pushedLength - 1;
  }
  return (
    <div className="message-area">
      {messagesToRender.map((message, index) => {
        const nextMessage = messagesToRender[index + 1];
        let showArrow = true;
        if (nextMessage) {
          showArrow = nextMessage.isUser !== message.isUser;
        }
        return <Message key={message.id} data={message} showArrow={showArrow} />;
      })}
    </div>
  );
}
