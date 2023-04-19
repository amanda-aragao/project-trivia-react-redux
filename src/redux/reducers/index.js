import { combineReducers } from 'redux';
import game from './game';
import login from './login';

const rootReducer = combineReducers(
  {
    login,
    game,
  },
);

export default rootReducer;
