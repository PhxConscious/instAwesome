import React from 'react';
import {Redirect} from 'react-router-dom';
import { postFeedback } from '../../redux/actions/feedback'

const UserListItem = ({ userInfo, user, selectUser }) => {

  return (
    <div
      onClick={e => selectUser(user.first_name)}
    >
      {user.first_name}
    </div>
  )
}

export default UserListItem;
