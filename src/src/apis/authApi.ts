import { getSessionStorage } from '../utils/Functions';

const LOCAL_STORAGE_AUTH_KEY = 'auth-token';

const isLoggedIn = () => {
  const token = getUserData();
  if (token) return true;
  return false;
};

const getUserData = () => localStorage.getItem(LOCAL_STORAGE_AUTH_KEY);

const removeUserData = () => {
  localStorage.removeItem(LOCAL_STORAGE_AUTH_KEY);
};

const saveUserData = (user) => {
  localStorage.setItem(LOCAL_STORAGE_AUTH_KEY, JSON.stringify(user));
};

function authHeader() {
  // return authorization header with jwt token
  const userData = getUserData();
  let user = JSON.parse(userData);
  if (user && user.token) {
    return { Authorization: 'Bearer ' + user.token };
  } else {
    return {};
  }
}

export default {
  isLoggedIn,
  getUserData,
  saveUserData,
  removeUserData,
  authHeader,
};
