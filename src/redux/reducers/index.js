import { combineReducers } from 'redux';
import userProgress from './userProgress';
import lmsContent from './lmsContent';
import currentValues from './currentValues';
import companyInfo from "./companyInfo";
import userCompanyJoin from "./userCompanyJoin";
import feedback from "./feedback";
import userExpertJoin from './userExpertJoin';
import payments from './payments';
import loadStatus from './loadStatus';

const appReducer = combineReducers({
  loadStatus: loadStatus,
  userProgress: userProgress,
  lmsContent: lmsContent,
  currentValues: currentValues,
  companyInfo: companyInfo,
  userCompanyJoin: userCompanyJoin,
  feedback: feedback,
  userExpertJoin, userExpertJoin,
  payments: payments,
});

const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    state = undefined
  }
  return appReducer(state, action)
}

export default rootReducer;
