export const OPEN_SETTINGS = 'OPEN_SETTINGS';
export const CLOSE_SETTINGS = 'CLOSE_SETTINGS';
export const SAVE_USER = 'SAVE_USER';
export const SAVE_IMG = 'SAVE_IMG';
export const SAVE_QUESTIONS = 'SAVE_QUESTIONS';
const RESPONSE_CODE = 3;

export const openSettings = () => ({
  type: OPEN_SETTINGS,
});

export const closeSettings = () => ({
  type: CLOSE_SETTINGS,
});

export const fetchGravatar = (email) => ({
  type: SAVE_IMG,
  payload: `https://www.gravatar.com/avatar/${email}`,
});

export const saveQuestions = (data) => ({
  type: SAVE_QUESTIONS,
  payload: data,
});

export function fetchQuestions(history) {
  const token = localStorage.getItem('token');
  const url = `https://opentdb.com/api.php?amount=5&token=${token}`;
  return (dispatch) => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.response_code === RESPONSE_CODE) {
          history.push('/');
        }
        dispatch(saveQuestions(data.results));
      });
  };
}

export const saveUser = (stateComponent, img) => ({
  type: SAVE_USER,
  user: stateComponent,
  img: `https://www.gravatar.com/avatar/${img}`,
});
