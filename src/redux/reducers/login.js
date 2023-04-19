import { CLOSE_SETTINGS, OPEN_SETTINGS, SAVE_USER } from '../actions';

const INITIAL_STATE = {
  email: '',
  name: '',
  category: '',
  difficulty: '',
  settings: false,
  imgGravatar: '',
  scoreBoard: 0,
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

  case SAVE_USER:
    return ({
      ...state,
      email: action.user.email,
      name: action.user.name,
      imgGravatar: action.img,
    });

  default:
    return state;
  }
};

export default login;
