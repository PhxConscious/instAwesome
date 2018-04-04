import axios from 'axios';
import config from '../../config';

export const getCompanyInfo = (company_id) => {
    // console.log("Getting company", company_id);
    return {
        type: "GET_COMPANY_INFO",
        payload: axios.get(`${config.app.api}/company/${company_id}`)
    }
};

export const updateCompanyInfo = (companyId, companyObj) => {
    // console.log("Action: updateCompanyInfo", companyId, companyObj);
    return {
        type: "UPDATE_COMPANY_INFO",
        payload: axios.put(`${config.app.api}/company/new/${companyId}`, companyObj)
    }
};

export const addCompanyInfo = (companyId, companyObj) => {
    // console.log("Action: addCompanyInfo", companyId, companyObj);
    return {
        type: "ADD_COMPANY_INFO",
        payload: axios.post(`${config.app.api}/company/new/${companyId}`, companyObj)
    }
};

export const getCompanyList = ({firebase_id}) => {
  return {
    type: "GET_COMPANY_LIST",
    payload: axios.get(`${config.app.api}/company/list/${firebase_id}`)
  }
}
