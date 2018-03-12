let initialState = {};

export default (state = initialState, action) => {
  console.log('reducer userCompanyJoin', action.type, action.payload)
    switch (action.type){
        case "GET_USER_COMPANY_JOIN_INFO_FULFILLED":
            return {
                ...state,
                companyInfo: action.payload.data[0]
            }
        case "GET_USER_COMPANY_JOIN_INFO_PENDING":
            return {
                ...state
            }
        case "GET_USER_COMPANY_JOIN_REJECTED":
            return {
                ...state
            }
        case "POST_USER_COMPANY_JOIN_INFO_FULFILLED":
            return {
                ...state,
                companyInfo: action.payload.data[0]
            }
        case "POST_USER_COMPANY_JOIN_INFO_PENDING":
            return {
                ...state
            }
        case "POST_USER_COMPANY_JOIN_INFO_REJECTED":
            return {
                ...state
            }
        default:
            return state;
    }
}
