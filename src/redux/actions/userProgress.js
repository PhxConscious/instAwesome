import axios from 'axios';

export const getUserProgress = (fb_id) => {
  return {
    type: "GET_USER_PROGRESS",
    payload: axios.get(`http://localhost:8080/users/${fb_id}`)
  }
}
