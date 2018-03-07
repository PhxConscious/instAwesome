import { combineReducers } from 'redux';
import userProgress from './userProgress';
import lmsContent from './lmsContent';
import currentValues from './currentValues';

const rootReducer = combineReducers({
  userProgress: userProgress,
  lmsContent: lmsContent,
  currentValues: currentValues
})

export default rootReducer;
