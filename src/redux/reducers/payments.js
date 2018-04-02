let initState = {
  currentPayment:{},
};

export default (state = initState, action) => {
  switch (action.type) {
    case "MAKE_PAYMENT_FULFILLED":
    // console.log("pay reduce", action.payload)
      return {
        ...state, currentPayment: action.payload.data[0]
      }
    case "MAKE_PAYMENT_PENDING":
      return { ...state }
    case "MAKE_PAYMENT_REJECTED":
      return { ...state }
    default:
      return { ...state }
  }
}
