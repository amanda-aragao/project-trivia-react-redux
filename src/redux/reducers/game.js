import { SAVE_QUESTIONS } from '../actions';

const INITIAL_STATE = {
  questions: '',
};

const game = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_QUESTIONS:
    return ({
      ...state,
      questions: action.payload,
    });

  default:
    return state;
  }
};

export default game;
