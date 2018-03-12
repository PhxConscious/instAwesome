let initialState = {
    companyInfo: {}
}

export default (state = initialState, action) => {
    console.log("reducer company: ", action.type, action.payload)
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
        case "ADD_COMPANY_INFO_FULFILLED":
            return {
                ...state,
                companyInfo: action.payload.data[0]
            }
        case "ADD_COMPANY_INFO_PENDING":
            return {
                ...state
            }
        case "ADD_COMPANY_INFO_REJECTED":
            return {
                ...state
            }
        default:
            return state;
    }
}
