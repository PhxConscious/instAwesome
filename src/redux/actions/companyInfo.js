import axios from 'axios';

export const getCompanyInfo = (company_id) => {
    console.log("Getting company", company_id);
    return {
        type: "GET_COMPANY_INFO",
        payload: axios.get(`http://localhost:8080/company/${company_id}`)
    }
};

export const updateCompanyInfo = (companyId, companyObj) => {
    console.log("Action: updateCompanyInfo", companyId, companyObj);
    return {
        type: "UPDATE_COMPANY_INFO",
        payload: axios.put(`http://localhost:8080/company/new/${companyId}`, companyObj)
    }
};

export const addCompanyInfo = (companyId, companyObj) => {
    console.log("Action: addCompanyInfo", companyId, companyObj);
    return {
        type: "ADD_COMPANY_INFO",
        payload: axios.post(`http://localhost:8080/company/new/${companyId}`, companyObj)
    }
};
