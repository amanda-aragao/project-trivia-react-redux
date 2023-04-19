const getTokens = async () => {
  const URL = 'https://opentdb.com/api_token.php?command=request';
  const response = await fetch(URL);
  const data = await response.json();
  localStorage.setItem('token', data.token);
  return data.token;
};

export default getTokens;
