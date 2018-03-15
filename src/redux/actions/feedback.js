import axios from 'axios';

export const getFeedbackByUserId = (fb_id) => {
  return {
    type: 'GET_FEEDBACK_BY_USER_ID',
    payload: axios.get(`http://localhost:8080/feedback/user/${fb_id}`)
  }
}

export const getFeedbackByCommentId = (comment_id) => {
  return {
    type: 'GET_FEEDBACK_BY_COMMENT_ID',
    payload: axios.get(`http://localhost:8080/feedback/comment/${comment_id}`)
  }
}

export const getAllFeedback = (fb_id) => {
  return {
    type: 'GET_ALL_FEEDBACK',
    payload: axios.get(`http://localhost:8080/feedback/`)
  }
}

export const postFeedback = (fb_id, commentObj) => {
  return {
    type: 'POST_FEEDBACK',
    payload: axios.post(`http://localhost:8080/feedback/new/${fb_id}`, commentObj)
  }
}
