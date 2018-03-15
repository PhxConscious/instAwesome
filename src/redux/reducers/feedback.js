let initState = {};

export default (state = initState, action) => {
  switch (action.type) {

    case "GET_FEEDBACK_BY_USER_ID_FULFILLED":
      return {
        ...state, allCommentsCurUser: action.payload.data
      }

    case "GET_FEEDBACK_BY_COMMENT_ID_FULFILLED":
      return {
        ...state, selectedComment: action.payload.data
      }

    case "GET_ALL_FEEDBACK_FULFILLED":
      return {
        ...state, allComments: action.payload.data
      }

    case "POST_FEEDBACK_FULFILLED":
      return {
        ...state, selectedComment: action.payload.data
      }

    case "GET_FEEDBACK_BY_USER_ID_PENDING":
      return { ...state }

    case "GET_FEEDBACK_BY_COMMENT_ID_PENDING":
      return { ...state }

    case "GET_ALL_FEEDBACK_PENDING":
      return { ...state }

    case "POST_FEEDBACK_PENDING":
      return { ...state }

    case "GET_FEEDBACK_BY_USER_ID_REJECTED":
      return { ...state }

    case "GET_FEEDBACK_BY_COMMENT_ID_REJECTED":
      return { ...state }

    case "GET_ALL_FEEDBACK_REJECTED":
      return { ...state }

    case "POST_FEEDBACK_REJECTED":
      return { ...state }

    default:
      return { ...state}
  }
}
