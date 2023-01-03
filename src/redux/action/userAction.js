export const FETCH_USER_LOGIN_SUCCESS = 'FETCH_USER_LOGIN_SUCCESS';
export const USER_LOGOUT_SUCCESS = 'USER_LOGOUT_SUCCESS';

export const doLogin = (response) => {
  return {
    type: FETCH_USER_LOGIN_SUCCESS,
    payload: response,
  };
};

export const doLogOut = () => {
  return {
    type: USER_LOGOUT_SUCCESS,
  };
};
