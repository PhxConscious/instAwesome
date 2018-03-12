import { combineReducers } from 'redux';
import userProgress from './userProgress';
import lmsContent from './lmsContent';
import currentValues from './currentValues';
import companyInfo from "./companyInfo";
import userCompanyJoin from "./userCompanyJoin";

const rootReducer = combineReducers({
  userProgress: userProgress,
  lmsContent: lmsContent,
  currentValues: currentValues,
  companyInfo: companyInfo,
  userCompanyJoin: userCompanyJoin
});

export default rootReducer;
