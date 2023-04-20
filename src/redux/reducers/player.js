import { SAVE_POINTS } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_POINTS:
    return ({
      ...state,
      score: Number(state.score) + Number(action.payload),
      assertions: action.assertions,
      name: action.name,
      email: action.email,
    });

  default:
    return state;
  }
};

export default player;
