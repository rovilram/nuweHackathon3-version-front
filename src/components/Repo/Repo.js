import React from 'react';
import './Repo.css';

const Repo = ({ children }) => {
  console.log(children);
  return (
    <div className="Repo__wrapper">
      <h3>{children.name}</h3>
      {children.language && (
        <div className="Repo__lang-wrapper">
          <p className="Repo__lang-label">lenguaje:</p>
          <p className="Repo__lang-text">{children.language}</p>
        </div>
      )}
      {children.id && (
        <div className="Repo__id-wrapper">
          <p className="Repo__id-label">ID:</p>
          <p className="Repo__id-text">{children.id}</p>
        </div>
      )}
      <div className="Repo__url-wrapper">
        <p className="Repo__url-text">
          <a href={children.clone_url} target="_blank" rel="noreferrer">
            enlace
          </a>
        </p>
      </div>
    </div>
  );
};

export default Repo;
