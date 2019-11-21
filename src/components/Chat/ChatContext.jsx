import { createContext } from 'react';

export const ChatContext = createContext({
  messages: [],
  addMessage: () => {},
  addBotMessage: () => {},
  botIsWriting: () => false,
});
