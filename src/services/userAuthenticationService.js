import requestSender from '@/utils/requestSender';
import tokenUtils from '../utils/tokenUtils';

function logout() {
  tokenUtils.removeToken();
}

function login(username, password) {
  const url = '/authentication/login';
  // TODO: Change this once server authentication is ready
  tokenUtils.setToken(JSON.stringify('This is just a dummy token'));
  if (true && username !== '') {
    return Promise.resolve();
  }

  return requestSender.post(url, { login: username, password }).then((user) => {
    if (user.token) {
      tokenUtils.setToken(JSON.stringify(user.token));
    } else {
      return Promise.reject(
        new Error("No token provided in server's response"),
      );
    }

    return user;
  });
}

export default {
  login,
  logout,
};
