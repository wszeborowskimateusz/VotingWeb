export default {
  getToken() {
    return localStorage.getItem('user-token');
  },
  setToken(token) {
    localStorage.setItem('user-token', token);
  },
  removeToken() {
    localStorage.removeItem('user-token');
  },
};
