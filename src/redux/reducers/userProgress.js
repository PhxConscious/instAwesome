let initialState = {
  currentUser: {}
}

export default (state = initialState, action) => {
  switch (action.type){
    case "GET_USER_PROGRESS_FULFILLED":
      return {
        ...state,
        currentUser: action.payload.data[0]
      }
    case "GET_USER_PROGRESS_PENDING":
      return {
        ...state
      }
    case "GET_USER_PROGRESS_REJECTED":
      return {
        ...state
      }
    case "NEXT_QUESTION_FULFILLED":
    // console.log('userPRogReducer ', action.payload.data[0])
      return {
        ...state,
        currentUser: action.payload.data[0]
      }
    case "NEXT_QUESTION_PENDING":
      return {
        ...state
      }
    case "CREATE_NEW_USER_FULFILLED":
      return {
        ...state,
        currentUser: action.payload.data[0]
      }
    case "CREATE_NEW_USER_PENDING":
      return {
        ...state
      }
    default:
      return state;
  }
}
