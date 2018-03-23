import axios from 'axios';
import config from '../../config'

export const getUserCompanyJoinInfo = (fb_id) => {
    // console.log("Action: Getting user company join", fb_id);
    return {
        type: "GET_USER_COMPANY_JOIN_INFO",
        payload: axios.get(`${config.app.api}/usercompanyjoin/${fb_id}`)
    }
};

export const postUserCompanyJoinInfo = (fb_id) => {
    // console.log("Action: postUserCompanyJoinInfo", fb_id);
    return {
        type: "POST_USER_COMPANY_JOIN_INFO",
        payload: axios.post(`${config.app.api}/usercompanyjoin/new/${fb_id}`)
    }
};
