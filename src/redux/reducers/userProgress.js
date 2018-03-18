let initialState = {
  currentUser: {}
}

export default (state = initialState, action) => {
  switch (action.type){
    case "GET_ALL_USERS_FULFILLED":
      return {
        ...state,
        allUsers: action.payload.data
      }
    case "GET_ALL_USERS_PENDING":
      return {...state}
    case "GET_ALL_USERS_REJECTED":
      return {...state}


    case "GET_USER_PROGRESS_FULFILLED":
      return {
        ...state,
        currentUser: action.payload.data[0]
      }
    case "GET_USER_PROGRESS_PENDING":
      return {...state}
    case "GET_USER_PROGRESS_REJECTED":
      return {...state}


    case "SELECT_AN_EXPERT_FULFILLED":
      return {
        ...state,
        selectedExpert: action.payload.data[0]
      }
    case "SELECT_AN_EXPERT_PENDING":
      return {...state}
    case "SELECT_AN_EXPERT_REJECTED":
      return {...state}


    case "NEXT_QUESTION_FULFILLED":
      return {
        ...state,
        currentUser: action.payload.data[0]
      }
    case "NEXT_QUESTION_PENDING":
      return {...state}
    case "NEXT_QUESTION_REJECTED":
        return {...state}


    case "CREATE_NEW_USER_FULFILLED":
      return {
        ...state,
        currentUser: action.payload.data[0]
      }
    case "CREATE_NEW_USER_PENDING":
      return {...state}
    case "CREATE_NEW_USER_REJECTED":
      return {...state}


    case "GET_ALL_EXPERTS_FULFILLED":
      return {
        ...state,
        expertList: action.payload.data
      }
    case "GET_ALL_EXPERTS_PENDING":
      return {...state}
    case "GET_ALL_EXPERTS_REJECTED":
      return {...state}

    default:
      return state;
  }
}
