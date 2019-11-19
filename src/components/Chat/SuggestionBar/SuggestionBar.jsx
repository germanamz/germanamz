import React from 'react';
import { ChatContext } from '../ChatContext';

export function SuggestionBar() {
  const render = ({ text }) => {
    return (
      <div className="suggestion-bar">

      </div>
    );
  };
  return (
    <ChatContext.Consumer>
      {render}
    </ChatContext.Consumer>
  );
}
