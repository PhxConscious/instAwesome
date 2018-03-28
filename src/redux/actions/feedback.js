import axios from 'axios';
import config from '../../config'

export const getFeedbackByUserId = (fb_id) => {
  return {
    type: 'GET_FEEDBACK_BY_USER_ID',
    payload: axios.get(`${config.app.api}/feedback/user/${fb_id}`)
  }
}

export const getFeedbackByCommentId = (comment_id) => {
  return {
    type: 'GET_FEEDBACK_BY_COMMENT_ID',
    payload: axios.get(`${config.app.api}/feedback/comment/${comment_id}`)
  }
}

export const getFeedbackByParentId = (parent_id) => {
  return {
    type: "GET_FEEDBACK_BY_PARENT_ID",
    payload: axios.get(`${config.app.api}/feedback/parent/${parent_id}`)
  }
}

export const getAllFeedback = () => {
  return {
    type: 'GET_ALL_FEEDBACK',
    payload: axios.get(`${config.app.api}/feedback/`)
  }
}

export const postFeedback = (fb_id, commentObj) => {
  console.log("postFeedback", fb_id, commentObj)
  return {
    type: 'POST_FEEDBACK',
    payload: axios.post(`${config.app.api}/feedback/new/${fb_id}`, commentObj)
  }
}
