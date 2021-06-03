import Logo from '../Logo/Logo';
import Button from '../Button/Button';

import './Header.css';

import React, {useContext} from 'react';
import LoggedContext from '../../context/loggedContext';

export const Header = () => {
  const { logged, setLogged } = useContext(LoggedContext);

  const clickLogout = () => {
    setLogged(false);
  }

  return (
    <header className="app__header">
      <Logo>GitHub Search</Logo>
      {logged && <Button click={clickLogout}>Desconectar</Button>}
    </header>
  );
};

export default Header;
