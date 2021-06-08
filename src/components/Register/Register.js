import './Register.css';
import Input from '../Input/Input';
import Button from '../Button/Button';
import Error from '../Error/Error';

import React, { useState, useEffect } from 'react';
// import LoggedContext from '../../context/loggedContext';
import { useHistory } from 'react-router-dom';
import useFetch from '../../Hooks/useFetch';

export const Register = () => {
  const [registerData, setRegisterData] = useState({});
  const [error, setError] = useState('');
  // const { setLogged } = useContext(LoggedContext);
  const history = useHistory();
  const [registerFetchStatus, registerFetch] = useFetch();

  const changeUsername = (username) => {
    setRegisterData({ ...registerData, username });
    setError('');
  };

  const changePassword = (password) => {
    setRegisterData({ ...registerData, password });
    setError('');
  };

  const changeEmail = (email) => {
    setRegisterData({ ...registerData, email });
    setError('');
  };

  const clickCancel = () => {
    setRegisterData({});
    setError('');
  };

  const clickSend = (e) => {
    e.preventDefault();
    const url = `http://localhost:3000/register`;
    const method = 'POST';
    const body = {
      username: registerData.username,
      password: registerData.password,
      email: registerData.email,
    };
    // Estas opciones prefefinidas con las que se necesitan para guardar y mandar cookies
    const options = {
      withCredentials: true,
      credentials: 'include',
    };
    registerFetch({ url, method, body, options });
  };

  useEffect(() => {
    const loggin = () => {
      history.push('/');
    };
    registerFetchStatus.isSuccess && loggin();

    registerFetchStatus.isFailed && setError(registerFetchStatus.error.message);
  }, [history, registerFetchStatus]);
  return (
    <div className="Login__wrapper">
      <form className="Login__form" onSubmit={clickSend}>
        <div className="Login__Input-wrapper">
          <Input
            name="usuario github"
            inputType="text"
            change={changeUsername}
            id="email"
          >
            {registerData.username}
          </Input>
          <Input
            name="contraseña"
            change={changePassword}
            id="password"
            inputType="password"
          >
            {registerData.password}
          </Input>
          <Input name="email" change={changeEmail} id="email" inputType="email">
            {registerData.email}
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

export default Register;
