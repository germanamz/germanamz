import React, { useState } from 'react';
import ChatStyles from './Chat.scss';
import { match, execByText } from '../../common/commands'
import { MessageArea } from './MessageArea/MessageArea';
import { ChatContext } from './ChatContext';
import { SuggestionBar } from './SuggestionBar/SuggestionBar';
import { FieldBar } from './FieldBar/FieldBar';


export function Chat() {
  const [ messages, setMessages ] = useState([]);
  const [ text, setText ] = useState('');
  const [ suggestions, setSuggestions ] = useState([]);

  const ctx = {
    messages,
    setMessages,
    text,
    setText,
    suggestions,
    setSuggestions,
    execByText,
    match,
  };

  return (
    <ChatContext.Provider value={ctx}>
      <div className={ChatStyles.chat}>
        <MessageArea />
        <SuggestionBar />
        <FieldBar />
      </div>
    </ChatContext.Provider>
  );
}
