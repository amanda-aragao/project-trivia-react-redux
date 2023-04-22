import { SAVE_RANK, UPDATE_RANK } from '../actions';

const INITIAL_STATE = [];

const rank = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_RANK:
    localStorage.setItem('rank', JSON.stringify([{ ...action.payload }]));
    return ({
      ...state,
      playersRank: [{ ...action.payload }],
    });
  case UPDATE_RANK:
    localStorage.setItem('rank', JSON.stringify([...state.playersRank,
      { ...action.payload }].sort((a, b) => b.score - a.score)));
    return ({
      ...state,
      playersRank: [...state.playersRank, { ...action.payload }],
    });

  default:
    return state;
  }
};

export default rank;
