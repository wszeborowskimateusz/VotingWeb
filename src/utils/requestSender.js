import fetchTimeout from 'fetch-timeout';
import config from '@/../config';

function refreshToken(refreshedToken) {
  localStorage.setItem('user-token', JSON.stringify(refreshedToken));
}

function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        localStorage.removeItem('user-token');
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

export default {
  sendGetRequest(url) {
    const token = JSON.parse(localStorage.getItem('user-token'));
    if (token !== null) {
      const requestOptions = {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      };

      return fetchTimeout(prepareApiUrl(url), requestOptions, config.requestTimeout, 'TIMEOUT')
        .then((response) => handleResponse(response));
    }
    return Promise.reject(new Error('No token provided'));
  },
  sendPostRequest(url, body) {
    const token = JSON.parse(localStorage.getItem('user-token'));
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    };

    if (token) {
      requestOptions.headers.Authorization = `Bearer ${token}`;
      return fetchTimeout(prepareApiUrl(url), requestOptions, config.requestTimeout, 'TIMEOUT')
        .then((response) => handleResponse(response));
    }

    return Promise.reject(new Error('No token provided'));
  },
  sendGetRequestWithoutAuthorization(url) {
    const requestOptions = { method: 'GET' };

    return fetchTimeout(prepareApiUrl(url), requestOptions, config.requestTimeout, 'TIMEOUT')
      .then((response) => handleResponse(response));
  },
  sendPostRequestWithoutAuthorization(url, body) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    };

    return fetchTimeout(prepareApiUrl(url), requestOptions, config.requestTimeout, 'TIMEOUT')
      .then((response) => handleResponse(response));
  },
};
