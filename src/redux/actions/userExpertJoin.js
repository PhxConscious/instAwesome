import axios from 'axios';
import config from '../../config'

export const getUsersOfExpert = (expert_id) => {
  return {
    type: "GET_USERS_OF_EXPERT",
    payload: axios.get(`${config.app.api}/userexpertjoin/users/${expert_id}`)
  }
}

export const getExpertOfUser = (user_id) => {
  return {
    type: "GET_EXPERT_OF_USER",
    payload: axios.get(`${config.app.api}/userexpertjoin/experts/${user_id}`)
  }
}

export const getFreeUsers = () => {
  return {
    type: "GET_FREE_USERS",
    payload: axios.get(`${config.app.api}/userexpertjoin/freeusers`)
  }
}

export const postNewUserExpertJoin = (obj) => {
  return {
    type: "POST_NEW_USER_EXPERT_JOIN",
    payload: axios.post(`${config.app.api}/userexpertjoin/new`, obj)
  }
}

export const deleteUserExpertJoin = (user_id) => {
  return {
    type: "DELETE_USER_EXPERT_JOIN",
    payload: axios.delete(`${config.app.api}/userexpertjoin/${user_id}`)
  }
}
