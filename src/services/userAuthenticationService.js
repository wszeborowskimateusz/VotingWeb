import requestSender from '@/utils/requestSender';

function logout() {
  localStorage.removeItem('user-token');
}

function login(username, password) {
  const url = '/authentication/login';
  return requestSender
    .sendPostRequestWithoutAuthorization(url, { login: username, password })
    .then((user) => {
      if (user.token) {
        localStorage.setItem('user-token', JSON.stringify(user.token));
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
