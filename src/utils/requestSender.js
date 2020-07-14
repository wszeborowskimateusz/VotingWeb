import fetchTimeout from 'fetch-timeout';
import config from '@/../config';
import download from 'downloadjs';
import tokenUtils from './tokenUtils';

function refreshToken(refreshedToken) {
  tokenUtils.setToken(JSON.stringify(refreshedToken));
}

function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        tokenUtils.removeToken();
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    if (response.headers.get('Refreshed-Jwt-Token')) {
      refreshToken(response.headers.get('Refreshed-Jwt-Token'));
    }
    return data;
  });
}

function prepareApiUrl(url) {
  return `${config.apiUrl}${url}`;
}

function sendRequest(url, options) {
  const token = JSON.parse(tokenUtils.getToken());
  const reqOptions = options;
  if (token !== null) {
    reqOptions.headers.Authorization = `Bearer ${token}`;
  }

  return fetchTimeout(
    prepareApiUrl(url),
    reqOptions,
    config.requestTimeout,
    'TIMEOUT',
  ).then((response) => handleResponse(response));
}

export default {
  get(url) {
    const options = { method: 'GET' };
    return sendRequest(url, options);
  },
  post(url, body) {
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    };

    return sendRequest(url, options);
  },
  postFile(url, file) {
    const options = {
      method: 'POST',
      body: file,
    };

    return sendRequest(url, options);
  },
  getFile(url) {
    return download(url);
  },
  put(url, body) {
    const options = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    };

    return sendRequest(url, options);
  },
  delete(url) {
    const options = { method: 'DELETE' };

    return sendRequest(url, options);
  },
};
