import fetchTimeout from 'fetch-timeout';
import EventBus from '@/utils/eventBus';
import config from '@/../config';
import toasts from '@/utils/toasts';
import i18n from '../i18n';
import tokenUtils from './tokenUtils';
import FileDownloader from '../plugins/file_downloader/fileDownloader';

function refreshToken(refreshedToken) {
  tokenUtils.setToken(JSON.stringify(refreshedToken));
}

function handleResponse(response, url) {
  return response.text().then((text) => {
    if (!response.ok) {
      if (response.status === 401 && url !== '/authentication/login/admin') {
        toasts.errorToast(i18n.tc('login.invalidToken'));
        EventBus.$emit('logout');
      }

      const error = {
        httpCode: response.status,
        errorCode: text,
      };

      return Promise.reject(error);
    }

    const data = text && JSON.parse(text);

    console.log(response);

    if (response.headers.get('Refreshed-Jwt-Token')) {
      console.log(
        `Refreshed token: ${response.headers.get('Refreshed-Jwt-Token')}`,
      );
      refreshToken(response.headers.get('Refreshed-Jwt-Token'));
    }
    return data;
  });
}

function prepareApiUrl(url) {
  return `${config.apiUrl}${url}`;
}

function sendRequest(url, options) {
  console.log(`Calling url: ${url}`);
  const token = JSON.parse(tokenUtils.getToken());
  const reqOptions = options;
  if (token !== null) {
    if (reqOptions.headers == null) {
      reqOptions.headers = {};
    }
    reqOptions.headers.Authorization = `Bearer ${token}`;
  }

  if (options.body) {
    console.log(options.body);
  }

  return fetchTimeout(
    prepareApiUrl(url),
    reqOptions,
    config.requestTimeout,
    'TIMEOUT',
  ).then(
    (response) => handleResponse(response, url),
    (error) => console.log(error),
  );
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
  downloadFile(url, body = null) {
    const token = JSON.parse(tokenUtils.getToken());

    return new FileDownloader({
      url: prepareApiUrl(url),
      headers: [{ name: 'Authorization', value: `Bearer ${token}` }],
      method: body != null ? 'POST' : 'GET',
      body: body != null ? JSON.stringify(body) : body,
    });
  },
  postWithFile(url, formData) {
    const options = {
      method: 'POST',
      body: formData,
    };

    return sendRequest(url, options);
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
