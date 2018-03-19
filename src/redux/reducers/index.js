import { combineReducers } from 'redux';
import userProgress from './userProgress';
import lmsContent from './lmsContent';
import currentValues from './currentValues';
import companyInfo from "./companyInfo";
import userCompanyJoin from "./userCompanyJoin";
import feedback from "./feedback";
import userExpertJoin from './userExpertJoin';

const appReducer = combineReducers({
  userProgress: userProgress,
  lmsContent: lmsContent,
  currentValues: currentValues,
  companyInfo: companyInfo,
  userCompanyJoin: userCompanyJoin,
  feedback: feedback,
  userExpertJoin, userExpertJoin
});

const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    state = undefined
  }

  console.log("rootReducer state:", state, "action.type", action.type)
  return appReducer(state, action)
}

export default rootReducer;
