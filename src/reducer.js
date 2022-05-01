import { combineReducers } from 'redux'
import { memberInfoReducer } from './member/reducers'

const rootReducer = combineReducers({
  memberInfo: memberInfoReducer
});

export default rootReducer;
