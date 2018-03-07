


export const setCurrentValue = (key, value) => {
  console.log("action", key, value)
  return {
    type: "SET_CURRENT_VALUE",
    payload: {[key]: value}
  }
}
