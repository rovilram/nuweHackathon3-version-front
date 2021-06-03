import './Card.css';

import React from 'react';
import { useHistory } from 'react-router-dom';


import Button from '../Button/Button';

export const Card = ({ children }) => {
  
  const history = useHistory();
  const clickRepos = () => {
    history.push(`/user-repos/${children.login}`)
  }

  return (
    <div className="Card__wrapper">
      <h2>{children.login}</h2>
      <div className="Card__img-wrapper">
        <img src={children.avatar_url} alt="github user avatar" />
      </div>
      {children.name && (
        <div className="Card__name">
          <p className="Card__name-label">Nombre:</p>
          <p className="Card__name-text">{children.name}</p>
        </div>
      )}
      <div className="Card__numRepos">
        <p className="Card__numRepos-label">Número repositorios públicos:</p>
        <p className="Card__numRepos-text">{children.public_repos}</p>
      </div>
      <Button click={clickRepos}>Ver repositorios </Button>
    </div>
  );
};

export default Card;
