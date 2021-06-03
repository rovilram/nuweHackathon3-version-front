import './Input.css';

import React from 'react';

export const Input = ({ children, name, id, inputType = 'text', change, error }) => {
  const handleInput = (e) => change(e.target.value);

  return (
    <div className="Input__Wrapper">
      <label htmlFor={id}>{name}</label>
      <input type={inputType} id={id} onChange={handleInput} value={children}/>
      {error && <div className="Input__error">error</div>}
    </div>
  );
};

export default Input;
