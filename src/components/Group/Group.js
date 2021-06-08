import './Group.css';
import Input from '../Input/Input';
import Button from '../Button/Button';
import Error from '../Error/Error';

import Search from '../Search/Search';
import MemberList from '../MemberList/MemberList';
import Repo from '../Repo/Repo';

import React, { useState, useContext, useEffect } from 'react';
import LoggedContext from '../../context/loggedContext';
import { useHistory } from 'react-router-dom';
import useFetch from '../../Hooks/useFetch';

export const Group = () => {
  const [teamData, setTeamData] = useState({ users: [], repos: [] });
  const [error, setError] = useState('');
  const { logged } = useContext(LoggedContext);
  const history = useHistory();
  const [registerFetchStatus, registerFetch] = useFetch();
  const [reposFetchState, reposFetch] = useFetch();

  // si no está logeado no puede estar en esta página
  !logged && history.push('/');

  useEffect(() => {
    console.log('hago fetch');
    const url = `https://api.github.com/users/${logged.username}/repos`;
    const method = 'GET';
    logged.username && reposFetch({ url, method });
  }, [logged.username, reposFetch]);

  const changeTeamName = (teamName) => {
    setTeamData({ ...teamData, teamName });
    setError('');
  };

  const changeDescription = (e) => {
    setTeamData({ ...teamData, description: e.target.value });
    setError('');
  };

  const addUser = (user) => {
    if (!teamData.users.map((el) => el.username).includes(user.username)) {
      setTeamData({ ...teamData, users: [...teamData.users, user] });
      setError('');
    } else setError('El usuario ya está en el equipo');
  };

  const delUser = (username) => {
    setTeamData({
      ...teamData,
      users: teamData.users.filter((user) => user.username !== username),
    });
  };

  const clickCancel = () => {
    setTeamData({});
    setError('');
  };

  const clickSend = (e) => {
    e.preventDefault();
    const url = `http://localhost:3000/register`;
    const method = 'POST';
    const body = {
      teamName: teamData.username,
      description: teamData.password,
      users: teamData.users,
    };
    // Estas opciones prefefinidas con las que se necesitan para guardar y mandar cookies
    const options = {
      withCredentials: true,
      credentials: 'include',
    };
    registerFetch({ url, method, body, options });
  };

  const addRepo = (repo) => {
    const newRepo = {
      id: repo.id,
      name: repo.name,
      url: repo.clone_url,
      owner: repo.owner.login,
    };
    setTeamData({ ...teamData, repos: [...teamData.repos, newRepo] });
    console.log(teamData);
  };

  /*   useEffect(() => {
    const loggin = () => {
      history.push('/');
    };
    registerFetchStatus.isSuccess && loggin();

    registerFetchStatus.isFailed && setError(registerFetchStatus.error.message);
  }, [history, registerFetchStatus]); */

  return (
    <div className="Group__Wrapper">
      <h2 className="Group__title">Nuevo Grupo</h2>
      <form id="Group__addGroup" className="Group__form" onSubmit={clickSend}>
        <div className="Group__Input-wrapper">
          <Input
            name="Nombre del Grupo"
            inputType="text"
            change={changeTeamName}
            id="teamName"
          >
            {teamData.teamName}
          </Input>
          <label>
            Descripción
            <textarea
              onChange={changeDescription}
              className="Group__description"
            >
              {teamData.description}
            </textarea>
          </label>
        </div>
      </form>
      <h3 className="Group__subtitle">Miembros del equipo</h3>
      <MemberList delUser={delUser}>{teamData.users}</MemberList>
      <h3 className="Group__subtitle">Añadir miembros</h3>
      <Search addUser={addUser} />
      <h3 className="Group__subtitle">Añadir repositorios</h3>
      {reposFetchState.isSuccess &&
        reposFetchState.data.map((repo) => (
          <Repo key={repo.id} addRepo={addRepo}>
            {repo}
          </Repo>
        ))}
      <Error>{error}</Error>
      <div className="Group__Button-wrapper">
        <Input id="submit" inputType="submit" form="Group__addGroup">
          Enviar
        </Input>
        <Button click={clickCancel} form="Group__addGroup">
          Cancelar
        </Button>
      </div>
    </div>
  );
};

export default Group;
