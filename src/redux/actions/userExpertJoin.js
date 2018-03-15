import axios from 'axios';

export const getUsersOfExpert = (expert_id) => {
  return {
    type: "GET_USERS_OF_EXPERT",
    payload: axios.get(`http://localhost:8080/userexpertjoin/users/${expertIs}`)
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
    payload: axios.get(`http://localhost:8080/userexpertjoin/getfreeusers)
  }
}
