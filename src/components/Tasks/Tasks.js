import './Tasks.css';

import Task from '../Task/Task';

import React from 'react';

export const Tasks = ({ children, setTasks }) => {
  const printTasks = () => {
    return children.map((task) => <Task setTasks = {setTasks}>{task}</Task>)
  };

  return (
    <div className="Tasks__wrapper">
      {printTasks()}
    </div>
  );
};

export default Tasks;
