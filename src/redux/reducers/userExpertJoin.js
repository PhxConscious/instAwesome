let initState = {};

export default (state = initState, action) => {
  switch (action.type) {
    case "GET_USERS_OF_EXPERT_FULFILLED":
      return {
        ...state,
        usersOfExpert: action.payload.data
      }
    case "GET_EXPERT_OF_USER_FULFILLED":
      return {
        ...state,
        expertOfUser: action.payload.data
      }
    case "GET_FREE_USERS_FULFILLED":
      return {
        ...state,
        freeUsers: action.payload.data
      }
    case "GET_USERS_OF_EXPERT_PENDING":
      return { ...state }
    case "GET_EXPERT_OF_USER_PENDING":
      return { ...state }
    case "GET_FREE_USERS_PENDING":
      return { ...state }
    case "GET_USERS_OF_EXPERT_REJECTED":
      return { ...state }
    case "GET_EXPERT_OF_USER_REJECTED":
      return { ...state }
    case "GET_FREE_USERS_REJECTED":
      return { ...state }
    default:
      return { ...state }
  }
}
