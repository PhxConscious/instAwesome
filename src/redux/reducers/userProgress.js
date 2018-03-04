let initialState = {
  currentUser: {}
}

export default (state = initialState, action) => {
  switch (action.type){
    case "GET_USER_PROGRESS_FULFILLED":
      return {
        ...state,
        currentUser: action.payload.data[0].user_progress.progress
      }
    case "GET_USER_PROGRESS_PENDING":
      return {
        ...state
      }
    case "GET_USER_PROGRESS_REJECTED":
      return {
        ...state
      }
    default:
      return state;
  }
}
