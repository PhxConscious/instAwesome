export default (state, action) => {
  console.log("reducer", action.type, action.payload)
  switch (action.type) {

    case "SET_CURRENT_VALUE":
    console.log("fulfilled", action.payload)
      return {
        ...state,
        ...action.payload
      }
    default:
      return {
        ...state
      }
  }
}
