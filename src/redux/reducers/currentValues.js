export default (state, action) => {
  switch (action.type) {

    case "SET_CURRENT_VALUE":
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
