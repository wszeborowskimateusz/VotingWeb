// import remoteConfig from 'configs/remoteDeploymentConfig.js';
import localDeploymentConfig from './configs/localDeploymentConfig';

export default {
  // TODO: This is based on the deployment type
  apiUrl: localDeploymentConfig.apiUrl,
  isLocalDeployment: true,
  requestTimeout: 15000, // in miliseconds
  supportedLocales: {
    en: 'English',
    pl: 'Polski',
  },
};
