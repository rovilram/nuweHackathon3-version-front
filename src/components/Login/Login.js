import './Login.css';
import Input from '../Input/Input';
import Button from '../Button/Button';
import Error from '../Error/Error';

import React, { useState, useContext } from 'react';
import LoggedContext from '../../context/loggedContext';
import { useHistory } from 'react-router-dom';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setLogged } = useContext(LoggedContext);
  const history = useHistory();

  const changeEmail = (mail) => {
    setEmail(mail);
    setError('');
  };

  const changePassword = (pass) => {
    setPassword(pass);
    setError('');
  };

  const clickCancel = () => {
    setEmail('');
    setPassword('');
    setError('');
  };

  const clickSend = (e) => {
    //e.preventDefault();
    if (email === 'admin@admin.es' && password === 'admin') {
      setLogged(true);
      history.push('/search');
    } else setError('email y contraseña no válidos.');
  };

  return (
    <div className="Login__wrapper">
      <form className="Login__form" onClick={clickSend}>
        <div className="Login__Input-wrapper">
          <Input name="email" inputType="email" change={changeEmail} id="email">
            {email}
          </Input>
          <Input
            name="contraseña"
            change={changePassword}
            id="password"
            inputType="password"
          >
            {password}
          </Input>
          <Error>{error}</Error>
        </div>
        <div className="Login__Button-wrapper">
          <Input id="submit" inputType="submit">
            Enviar
          </Input>
          <Button click={clickCancel}>Cancelar</Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
