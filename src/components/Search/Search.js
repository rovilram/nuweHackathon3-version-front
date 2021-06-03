import './Search.css';

import Input from '../Input/Input';
import Button from '../Button/Button';
import Card from '../Card/Card';

import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import useFetch from '../../Hooks/useFetch';
import UserDataContext from '../../context/userDataContext';
import LoggedContext from '../../context/loggedContext';

export const Search = () => {
  const [username, setUsername] = useState('');
  const [userFetchState, userFetch] = useFetch();

  const { userData, setUserData } = useContext(UserDataContext);
  const { logged } = useContext(LoggedContext);
  const history = useHistory();

  useEffect(() => {
    !logged && history.push('/');
  }, [history, logged]);

  useEffect(() => {
    const showDetail = async () => {
      await setUserData({
        avatar_url: userFetchState.data.avatar_url,
        login: userFetchState.data.login,
        name: userFetchState.data.name,
        public_repos: userFetchState.data.public_repos,
      });
    };
    userFetchState.isSuccess && showDetail();
  }, [setUserData, userFetchState]);

  const submitForm = (e) => {
    e.preventDefault();
    const url = `https://api.github.com/users/${username}`;
    console.log('USERNAME', username);
    const method = 'GET';
    userFetch({ url, method });
  };

  const clickClear = () => {
    setUsername('');
    setUserData({});
  };

  const changeUsername = (username) => {
    setUsername(username);
  };

  return (
    <div className="Search__wrapper">
      <form className="Search__form" onSubmit={submitForm}>
        <Input
          name="Usuario Github"
          change={changeUsername}
          id="Search__username"
          inputType="text"
        >
          {username}
        </Input>
        <div className="Search__buttons-wrapper">
          <Input id="Search__submit" inputType="submit">
            Buscar
          </Input>
          <Button click={clickClear}>Borrar</Button>
        </div>
      </form>

      {userData.login && <Card>{userData}</Card>}
    </div>
  );
};

export default Search;
