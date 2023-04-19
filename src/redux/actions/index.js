export const OPEN_SETTINGS = 'OPEN_SETTINGS';
export const CLOSE_SETTINGS = 'CLOSE_SETTINGS';
export const SAVE_USER = 'SAVE_USER';
export const SAVE_IMG = 'SAVE_IMG';

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

// export function fetchGravatar(email) {
//   const changeEmailforImg = md5(email).toString();
//   const gravatar = `https://www.gravatar.com/avatar/${changeEmailforImg}`;
//   console.log(gravatar);
//   return (dispatch) => {
//     fetch(gravatar)
//       .then((response) => response.json())
//       .then((data) => dispatch(saveImgGravatar(data)));
//   };
// }

export const saveUser = (stateComponent, img) => ({
  type: SAVE_USER,
  user: stateComponent,
  img: `https://www.gravatar.com/avatar/${img}`,
});
