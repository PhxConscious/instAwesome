let initialState = {
  book:[]
}

export default (state = initialState, action) => {
  switch (action.type){
    case "GET_LMS_CONTENT_FULFILLED":
      return {
        ...state,
        book: action.payload.data.rows[0].module.array
      };
    case "GET_LMS_CONTENT_PENDING":
      return {
        ...state
      };
    case "GET_LMS_CONTENT_REJECTED":
      return {
        ...state
      };
    default:
      return state;
  }
}
