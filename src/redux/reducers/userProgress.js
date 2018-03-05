let initialState = {
  currentUser: {}
}

export default (state = initialState, action) => {
  switch (action.type){
    case "GET_USER_PROGRESS_FULFILLED":
    console.log('init get', action.payload)
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
    console.log("fulfilled", action.payload)
      return {
        ...state,
        currentUser: action.payload.data
      }
    case "NEXT_QUESTION_PENDING":
      return {
        ...state
      }
    default:
      return state;
  }
}
