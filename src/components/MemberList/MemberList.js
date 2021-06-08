import './MemberList.css';

import UserSticker from '../UserSticker/UserSticker';

import React from 'react';

export const MemberList = ({ children, delUser }) => {
  return (
    <div className="MemberList__wrapper">
      {children.map((user) => (
        <UserSticker key={user.username} delUser={delUser}>
          {user}
        </UserSticker>
      ))}
    </div>
  );
};

export default MemberList;
