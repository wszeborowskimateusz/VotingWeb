import requestSender from '@/utils/requestSender';

function logout() {
  localStorage.removeItem('user-token');
}

function login(username, password) {
  const url = '/authentication/login';
  // TODO: Change this once server authentication is ready
  localStorage.setItem(
    'user-token',
    JSON.stringify('This is just a dummy token'),
  );
  if (true && username !== '') {
    return Promise.resolve();
  }

  return requestSender
    .post(url, { login: username, password })
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
