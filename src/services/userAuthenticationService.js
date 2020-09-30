import requestSender from '@/utils/requestSender';
import tokenUtils from '../utils/tokenUtils';

function logout() {
  tokenUtils.removeToken();
}

function login(username, password) {
  const url = '/authentication/login';

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
