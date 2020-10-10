import remoteDeploymentConfig from './configs/remoteDeploymentConfig';
import localDeploymentConfig from './configs/localDeploymentConfig';

export default {
  // TODO: This is based on the deployment type
  apiUrl:
    process.env.VUE_APP_SESSION_TYPE === 'local'
      ? localDeploymentConfig.apiUrl
      : remoteDeploymentConfig.apiUrl,
  requestTimeout: 15000, // in miliseconds
  supportedLocales: {
    en: 'English',
    pl: 'Polski',
  },
};
