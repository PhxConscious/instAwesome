import axios from 'axios';

export const getUserCompanyJoinInfo = (fb_id) => {
    console.log("Getting user company join", fb_id);
    return {
        type: "GET_USER_COMPANY_JOIN_INFO",
        payload: axios.get(`http://localhost:8080/userCompanyJoin/'${fb_id}'`)
    }
};

export const postUserCompanyJoinInfo = (fb_id) => {
    // console.log("Action: postUserCompanyJoinInfo");
    return {
        type: "POST_USER_COMPANY_JOIN_INFO",
        payload: axios.put(`http://localhost:8080/userCompanyJoin/new/'${fb_id}`)
    }
};
