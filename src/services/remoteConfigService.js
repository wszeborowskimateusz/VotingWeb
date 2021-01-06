import requestSender from '@/utils/requestSender';

function getRemoteConfig() {
  const url = '/remote-config';

  return requestSender.get(url);
}

export default {
  getRemoteConfig,
};
