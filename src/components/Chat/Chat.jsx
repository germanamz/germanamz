import React, { useState } from 'react';
import './Chat.scss';
import { MessageArea } from './MessageArea/MessageArea';
import { ChatContext } from './ChatContext';
import { SuggestionBar } from './SuggestionBar/SuggestionBar';
import { Field } from './Field/Field';

export class Chat extends React.Component {
  constructor(props) {
    super(props);

    const messages = [];
    this.state = { messages };
    this.messagesCount = 0;

    this.ctx = {
      messages,
      addMessage: this.addMessage.bind(this),
    };
  }

  componentDidMount() {
    this.addMessage('Hi!');
    this.addMessage('I\'m German\'s bot!');
    this.addMessage('How may i help you?');
  }

  addMessage(messageText, isUsers, data) {
    const message = {
      text: messageText,
      data,
      date: new Date(),
      isUsers,
      id: this.messagesCount,
    };
    this.messagesCount += 1;
    this.setState(({ messages }) => {
      messages.push(message);
      return messages;
    });
  }

  render() {
    return (
      <ChatContext.Provider value={this.ctx}>
        <div className="chat">
          <MessageArea />
          <SuggestionBar />
          <Field />
        </div>
      </ChatContext.Provider>
    );
  }
}
