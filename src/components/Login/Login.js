import './Login.css';
import Input from '../Input/Input';
import Button from '../Button/Button';
import Error from '../Error/Error';

import React, { useState, useContext, useEffect } from 'react';
import LoggedContext from '../../context/loggedContext';
import { useHistory } from 'react-router-dom';
import useFetch from '../../Hooks/useFetch';
import axios from 'axios';

export const Login = () => {
  const [username, setusername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setLogged } = useContext(LoggedContext);
  const history = useHistory();
  const [loginFetchStatus, loginFetch] = useFetch();

  const changeUsername = (mail) => {
    setusername(mail);
    setError('');
  };

  const changePassword = (pass) => {
    setPassword(pass);
    setError('');
  };

  const clickCancel = () => {
    setusername('');
    setPassword('');
    setError('');
  };

  const clickSend = (e) => {
    e.preventDefault();
    const url = `http://localhost:3000/api/user`;
    const method = 'GET';
    const body = {
      username,
      password,
    };
    // Estas opciones prefefinidas con las que se necesitan para guardar y mandar cookies
    const options = {
      withCredentials: true,
      credentials: 'include',
    };
    loginFetch({ url, method, options });
    //axios.defaults.withCredentials = true;
    //axios.get(url, body, headers).then((response) => console.log(response));
  };

  useEffect(() => {
    const loggin = () => {
      console.log('logeado!');
      console.log(loginFetchStatus);
      setLogged(true);
      history.push('/search');
    };
    loginFetchStatus.isSuccess && loggin();

    loginFetchStatus.isFailed && setError(loginFetchStatus.error.message);
  }, [
    history,
    loginFetchStatus.isSuccess,
    loginFetchStatus.isFailed,
    setLogged,
    loginFetchStatus.error,
    loginFetchStatus,
  ]);
  return (
    <div className="Login__wrapper">
      <form className="Login__form" onSubmit={clickSend}>
        <div className="Login__Input-wrapper">
          <Input
            name="usuario"
            inputType="text"
            change={changeUsername}
            id="email"
          >
            {username}
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
