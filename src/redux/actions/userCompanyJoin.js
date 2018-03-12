import axios from 'axios';

export const getUserCompanyJoinInfo = (fb_id) => {
    console.log("Action: Getting user company join", fb_id);
    return {
        type: "GET_USER_COMPANY_JOIN_INFO",
        payload: axios.get(`http://localhost:8080/usercompanyjoin/${fb_id}`)
    }
};

export const postUserCompanyJoinInfo = (fb_id) => {
    console.log("Action: postUserCompanyJoinInfo", fb_id);
    return {
        type: "POST_USER_COMPANY_JOIN_INFO",
        payload: axios.post(`http://localhost:8080/usercompanyjoin/new/${fb_id}`)
    }
};
