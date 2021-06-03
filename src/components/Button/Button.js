import './Button.css';

import React from 'react';

export const Button = ({ children, click }) => {
  const handleClick = () => click();

  return (
    <button className="Button__button" onClick={handleClick}>
      {children}
    </button>
  );
};

export default Button;
