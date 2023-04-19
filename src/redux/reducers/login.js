import { CLOSE_SETTINGS, OPEN_SETTINGS } from '../actions';

const INITIAL_STATE = {
  email: '',
  name: '',
  category: '',
  difficulty: '',
  settings: false,
};

const login = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case OPEN_SETTINGS:
    return ({
      ...state,
      settings: true,
    });
  case CLOSE_SETTINGS:
    return ({
      ...state,
      settings: false,
    });

  default:
    return state;
  }
};

export default login;
