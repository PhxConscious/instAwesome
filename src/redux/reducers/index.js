import { combineReducers } from 'redux';
import userProgress from './userProgress'

const rootReducer = combineReducers({
  userProgress: userProgress,
})

export default rootReducer;
