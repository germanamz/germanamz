import React from 'react';
import { ChatContext } from '../ChatContext';
import { Field } from './Field/Field';

export function FieldBar() {
  // eslint-disable-next-line react/prop-types
  const render = ({ text, setText }) => {
    const onSubmit = (event) => {
      console.log(event);
    };
    return (
      <form onSubmit={onSubmit}>
        <Field text={text} setText={setText} />
      </form>
    );
  };
  return (
    <ChatContext.Consumer>
      {render}
    </ChatContext.Consumer>
  );
}
