import { createContext } from 'react';

export const ChatContext = createContext({
  messages: [],
  setMessages: () => {},
  text: '',
  setText: () => {},
});
