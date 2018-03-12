let initialState = {
    companyInfo: {}
}

export default (state = initialState, action) => {
    switch (action.type){
        case "GET_COMPANY_INFO_FULFILLED":
            return {
                ...state,
                companyInfo: action.payload.data[0]
            }
        case "GET_COMPANY_INFO_PENDING":
            return {
                ...state
            }
        case "GET_COMPANY_INFO_REJECTED":
            return {
                ...state
            }
        case "UPDATE_COMPANY_INFO_FULFILLED":
            return {
                ...state,
                companyInfo: action.payload.data[0]
            }
        case "UPDATE_COMPANY_INFO_PENDING":
            return {
                ...state
            }
        default:
            return state;
    }
}
