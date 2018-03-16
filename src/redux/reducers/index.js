import { combineReducers } from 'redux';
import userProgress from './userProgress';
import lmsContent from './lmsContent';
import currentValues from './currentValues';
import companyInfo from "./companyInfo";
import userCompanyJoin from "./userCompanyJoin";
import feedback from "./feedback";
import userExpertJoin from './userExpertJoin';

const rootReducer = combineReducers({
  userProgress: userProgress,
  lmsContent: lmsContent,
  currentValues: currentValues,
  companyInfo: companyInfo,
  userCompanyJoin: userCompanyJoin,
  feedback: feedback,
  userExpertJoin, userExpertJoin
});

export default rootReducer;
