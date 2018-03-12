import axios from 'axios';

export const getUserProgress = (fb_id) => {
  console.log("Action: Getting user", fb_id)
  return {
    type: "GET_USER_PROGRESS",
    payload: axios.get(`http://localhost:8080/users/${fb_id}`)
  }
}

export const nextQuestion = (fb_id, data) => {
  console.log("action: nextQuestion", fb_id, data)
  return {
    type: "NEXT_QUESTION",
    payload: axios.put(`http://localhost:8080/users/${fb_id}`, data)
  }
}

export const createNewUser = (userObj) => {
  console.log("Action: createNewUser", userObj);
  return {
    type: "CREATE_NEW_USER",
    payload: axios.post(`http://localhost:8080/users/new`, userObj)
  }
}
