import axios from 'axios';

export const getUsersOfExpert = (expert_id) => {
  return {
    type: "GET_USERS_OF_EXPERT",
    payload: axios.get(`http://localhost:8080/userexpertjoin/users/${expert_id}`)
  }
}

export const getExpertOfUser = (user_id) => {
  return {
    type: "GET_EXPERT_OF_USER",
    payload: axios.get(`http://localhost:8080/userexpertjoin/experts/${user_id}`)
  }
}

export const getFreeUsers = () => {
  return {
    type: "GET_FREE_USERS",
    payload: axios.get(`http://localhost:8080/userexpertjoin/freeusers`)
  }
}

export const postNewUserExpertJoin = (obj) => {
  return {
    type: "POST_NEW_USER_EXPERT_JOIN",
    payload: axios.post(`http://localhost:8080/userexpertjoin/new`, obj)
  }
}

export const deleteUserExpertJoin = (user_id) => {
  return {
    type: "DELETE_USER_EXPERT_JOIN",
    payload: axios.delete(`http://localhost:8080/userexpertjoin/${user_id}`)
  }
}
