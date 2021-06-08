import './UserSticker.css';

import Button from '../Button/Button';

import React from 'react';

export const UserSticker = ({ children, delUser }) => {
  const handleDelete = () => {
    delUser(children.username);
  };

  console.log(children);
  return (
    <div className="UserSticker__Wrapper">
      <img
        className="UserSticker__img"
        src={children.img}
        alt="user github avatar"
      />
      <div className="UserSticker__username">{children.username}</div>
      <Button click={handleDelete} form="Group__addGroup">
        Eliminar
      </Button>
    </div>
  );
};

export default UserSticker;
