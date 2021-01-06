import remoteConfigService from '../services/remoteConfigService';

const defaultRemoteConfig = {
  minimalNumberOfPeopleInCommittee: 5,
};

let remoteConfigCache = null;

export default {
  async getRemoteConfig() {
    if (process.env.VUE_APP_SESSION_TYPE === 'remote') {
      if (remoteConfigCache == null) {
        try {
          remoteConfigCache = await remoteConfigService
            .getRemoteConfig()
            .catch(() => defaultRemoteConfig);
        } catch (_) {
          remoteConfigCache = defaultRemoteConfig;
        }
      }

      return remoteConfigCache;
    }

    return Promise.resolve(defaultRemoteConfig);
  },
};
