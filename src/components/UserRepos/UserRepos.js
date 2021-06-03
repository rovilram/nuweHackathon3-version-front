import './UserRepos.css';

import { useParams } from 'react-router-dom';
import useFetch from '../../Hooks/useFetch';
import React, { useEffect, useState, useContext } from 'react';
import LoggedContext from '../../context/loggedContext';
import { useHistory } from 'react-router-dom';

import Repo from '../Repo/Repo';
import Button from '../Button/Button';

export const UserRepos = () => {
  const [repos, setRepos] = useState([]);
  const [reposFetchState, reposFetch] = useFetch();
  const { username } = useParams();

  const { logged } = useContext(LoggedContext);
  const history = useHistory();

  useEffect(() => {
    !logged && history.push('/');
  }, [history, logged]);

  useEffect(() => {
    const url = `https://api.github.com/users/${username}/repos`;
    const method = 'GET';
    username && reposFetch({ url, method });
  }, [reposFetch, username]);

  useEffect(() => {
    reposFetchState.isSuccess && setRepos(reposFetchState.data);
  }, [reposFetchState]);

  const printRepo = () => repos.map((repo) => <Repo>{repo}</Repo>);

  const clickReturn = () => history.push('/search');

  return (
    <div className="UserRepos__wrapper">
      <h1>Listado de repositorios</h1>
      <h2>{username}</h2>
      <Button click={clickReturn}>Regresar</Button>
      <div className="UserRepos__repos-wrapper">{printRepo()}</div>
    </div>
  );
};

export default UserRepos;
