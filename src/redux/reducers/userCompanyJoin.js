let initialState = {
    userCompanyJoinInfo: {}
}

export default (state = initialState, action) => {
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
        case "UPDATE_USER_COMPANY_INFO_FULFILLED":
            return {
                ...state,
                companyInfo: action.payload.data[0]
            }
        case "UPDATE_USER_COMPANY_INFO_PENDING":
            return {
                ...state
            }
        default:
            return state;
    }
}
