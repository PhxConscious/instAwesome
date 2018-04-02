import axios from 'axios';
import config from '../../config'

export const getAllUsers = () => {
  // console.log("Action: Getting user", fb_id)
  return {
    type: "GET_ALL_USERS",
    payload: axios.get(`${config.app.api}/users`)
  }
}

export const getUserProgress = (fb_id) => {
  // console.log("Action: Getting user", fb_id)
  return {
    type: "GET_USER_PROGRESS",
    payload: axios.get(`${config.app.api}/users/${fb_id}`)
  }
}

export const selectAnExpert = (fb_id) => {
  // console.log("Action: Getting user", fb_id)
  return {
    type: "SELECT_AN_EXPERT",
    payload: axios.get(`${config.app.api}/users/${fb_id}`)
  }
}

export const nextQuestion = (fb_id, data) => {
  // console.log("action: nextQuestion", fb_id, data)
  return {
    type: "NEXT_QUESTION",
    payload: axios.put(`${config.app.api}/users/${fb_id}`, data)
  }
}

export const updateNonCurrentUser = (fb_id, data) => {
  // console.log("action: nextQuestion", fb_id, data)
  return {
    type: "UPDATE_NON_CURRENT_USER",
    payload: axios.put(`${config.app.api}/users/${fb_id}`, data)
  }
}

export const createNewUser = (userObj) => {
  // console.log("Action: createNewUser", userObj);
  return {
    type: "CREATE_NEW_USER",
    payload: axios.post(`${config.app.api}/users/new`, userObj)
  }
}

export const updateIsInstaStud = (firebase_id, bool) => {
  return {
    type: "UPDATE_IS_INSTA_STUD",
    payload: axios.put(`${config.app.api}/users/updateinstastud/${firebase_id}`, {
      isInstaStud: bool
    })
  }
}

export const getAllExperts = () => {
  return {
    type: "GET_ALL_EXPERTS",
    payload: axios.get(`${config.app.api}/users/experts`)
  }
}

export const deleteUser = (fb_id) => {
  return {
    type: "DELETE_USER",
    payload: axios.delete(`${config.app.api}/users/${fb_id}`)
  }
}
