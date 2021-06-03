import './Task.css';

import Button from '../Button/Button'

import React from 'react';

export const Task = ({ children, setTasks }) => {

  const clickEdit = () => {
    console.log("EDIT!!!")

  }

  
  const clickDel = () => {};



  return (
    <div className="Task__wrapper">
      <div className="Task__title">{children.title}</div>
      <Button click={clickEdit}>Editar</Button>
      <Button click={clickDel}>Borrar</Button>
    </div>
  );
};

export default Task;
