import React from 'react';

const UserListItem = ({ userInfo, user, selectUser }) => {

  return (
    <div
      onClick={e => selectUser(user)}
    >
      <p>{user.first_name}</p>
    </div>
  )
}

export default UserListItem;
