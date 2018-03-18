let initState = {};

// takes an unhitchedUser out of the freeUsers array upon posting
const removeObj = (takeOut, arr) => {
  let result = [];
  for(let i = 0; i < arr.length; i++){
    if(arr[i].firebase_id !== takeOut.user_id){
      result.push(arr[i])
    }
  }
  return result;
}

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
    case "POST_NEW_USER_EXPERT_JOIN_FULFILLED":
      return {
        ...state,
        selectedJoin: action.payload.data,
        freeUsers: removeObj(action.payload.data[0], state.freeUsers)
      }
    case "DELETE_USER_EXPERT_JOIN_FULFILLED":
      return {
        ...state,
        deletedJoin: action.payload.data[0]
      }
    case "GET_USERS_OF_EXPERT_PENDING":
      return { ...state }
    case "GET_EXPERT_OF_USER_PENDING":
      return { ...state }
    case "GET_FREE_USERS_PENDING":
      return { ...state }
    case "POST_NEW_USER_EXPERT_JOIN_PENDING":
      return { ...state }
    case "DELETE_USER_EXPERT_JOIN_PENDING":
      return { ...state }

    case "GET_USERS_OF_EXPERT_REJECTED":
      return { ...state }
    case "GET_EXPERT_OF_USER_REJECTED":
      return { ...state }
    case "GET_FREE_USERS_REJECTED":
      return { ...state }
    case "POST_NEW_USER_EXPERT_JOIN_REJECTED":
      return { ...state }
    case "DELETE_USER_EXPERT_JOIN_REJECTED":
      return { ...state }

    default:
      return { ...state }
  }
}
