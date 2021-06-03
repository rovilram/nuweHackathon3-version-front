import './Logo.css';

import React from 'react';

export const Logo = ({children}) => {
  return <h1 className= "Logo__Wrapper">{children}</h1>;
};

export default Logo;
