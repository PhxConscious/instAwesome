export default (state, action) => {
  console.log("reducer", action.payload)
  switch (action.type) {

    case "SET_CURRENT_VALUE_FULFILLED":
    console.log("fulfilled", action.payload.data)
      return {
        ...state,
        values: action.payload.data
      }
    default:
      return {
        ...state
      }
  }
}
