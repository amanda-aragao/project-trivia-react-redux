import { combineReducers } from 'redux';
import game from './game';
import login from './login';
import player from './player';
import rank from './Rank';

const rootReducer = combineReducers(
  {
    login,
    game,
    player,
    rank,
  },
);

export default rootReducer;
