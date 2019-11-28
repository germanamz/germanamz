import './Field.scss';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { ChatContext } from '../ChatContext';

export function Field() {
  const [ text, setText ] = useState('');
  // eslint-disable-next-line react/prop-types
  const render = ({ addMessage }) => {
    const onSubmit = (event) => {
      event.preventDefault();
      if (text && text.length) {
        addMessage(text, {}, true);
        setText('');
      }
    };
    let inputRef;
    const getInputRef = (iRef) => { inputRef = iRef; };
    return (
      <form className="field" onSubmit={onSubmit} onClick={() => inputRef.focus()}>
        <input type="text" placeholder="Write here..." value={text} onChange={e => setText(e.target.value)} ref={getInputRef} />
        <button type="submit">
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </form>
    );
  };
  return (
    <ChatContext.Consumer>
      {render}
    </ChatContext.Consumer>
  );
}
