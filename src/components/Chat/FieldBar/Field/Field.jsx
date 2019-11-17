import React from 'react';
import PropTypes from 'prop-types';

export function Field({ text, setText }) {
  return (
    <div>
      <input type="text" value={text} onChange={({ target: { value } }) => setText(value)} />
    </div>
  );
}

Field.propTypes = {
  text: PropTypes.string,
  setText: PropTypes.func,
};

Field.defaultProps = {
  text: true,
  setText: true,
};
