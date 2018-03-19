


export const setCurrentValue = (key, value) => {
  return {
    type: "SET_CURRENT_VALUE",
    payload: {[key]: value}
  }
}

export const userLogout = () => ({
  type: "USER_LOGOUT",
})
