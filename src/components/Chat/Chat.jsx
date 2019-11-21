import React from 'react';
import { queue } from 'async';
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
    this.botQueue = queue(({ text, data }, next) => {
      setTimeout(() => {
        this.addMessage(text, data, false);
        next();
      }, 800);
    });
    this.botQueue.drain(() => {
      this.botIsWriting = false;
      this.setState({ botIsWriting: false });
    });

    this.ctx = {
      messages,
      addMessage: this.addMessage.bind(this),
      addBotMessage: this.addBotMessage.bind(this),
      botIsWriting: () => this.botIsWriting,
    };
  }

  componentDidMount() {
    this.addBotMessage('Hi!');
    this.addBotMessage('I\'m German\'s bot!');
    this.addBotMessage('Sorry to tell you!');
    this.addBotMessage('But this bot still is under construction. 👨🏻‍💻');
    this.addBotMessage('If you\'d like to read some more about me, you can down load my info as PDF right [here](https://germanamz.com/cv.pdf)');
  }

  addBotMessage(text, data) {
    this.setState(() => {
      this.botQueue.push({ text, data });
      this.botIsWriting = true;
      return { botIsWriting: true };
    });
  }

  addMessage(messageText, messageData, isUser = false, showDate = true) {
    let data = messageData;
    let text = messageText;
    if (typeof messageText === 'object') {
      data = messageText;
      text = '';
    }
    const message = {
      text,
      data,
      date: new Date(),
      isUser,
      showDate,
      id: this.messagesCount,
    };
    this.messagesCount += 1;
    this.setState(({ messages }) => {
      messages.push(message);
      return { messages };
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
