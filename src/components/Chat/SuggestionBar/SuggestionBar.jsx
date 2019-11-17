import React from 'react';
import { ChatContext } from '../ChatContext';

export function SuggestionBar() {
  const render = ({ currentInput, suggestions, setSuggestions }) => {

  };
  return (
    <ChatContext.Consumer>
      {render}
    </ChatContext.Consumer>
  );
}
