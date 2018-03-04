import { combineReducers } from 'redux';
import userProgress from './userProgress';
import lmsContent from './lmsContent';

const rootReducer = combineReducers({
  userProgress: userProgress,
  lmsContent: lmsContent,
})

export default rootReducer;
