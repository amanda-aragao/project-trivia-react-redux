import { CLEAR_PLAYER, SAVE_POINTS } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  email: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_POINTS:
    return ({
      ...state,
      name: action.name,
      assertions: action.assertions,
      score: Number(state.score) + Number(action.payload),
      gravatarEmail: action.gravatar,
      email: action.email,
    });
  case CLEAR_PLAYER:
    return ({
      ...state,
      name: '',
      assertions: 0,
      score: 0,
      gravatarEmail: '',
    });
  default:
    return state;
  }
};

export default player;
