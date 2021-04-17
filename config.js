import remoteDeploymentConfig from './configs/remoteDeploymentConfig';
import localDeploymentConfig from './configs/localDeploymentConfig';
import getEnv from './src/utils/env';

/* eslint-disable no-nested-ternary */
export default {
  apiUrl:
  getEnv('VUE_APP_API_URL') != null
    ? getEnv('VUE_APP_API_URL')
    : process.env.VUE_APP_SESSION_TYPE === 'local'
      ? localDeploymentConfig.apiUrl
      : remoteDeploymentConfig.apiUrl,
  requestTimeout: 15000, // in miliseconds
  supportedLocales: {
    en: 'English',
    pl: 'Polski',
  },
};
