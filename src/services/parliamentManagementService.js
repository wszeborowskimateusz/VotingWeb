import requestSender from '@/utils/requestSender';

function getSessionsList() {
  const url = '/parliament';

  return requestSender.get(url);
}

function finishSession() {
  const url = '/parliament/finish';

  return requestSender.put(url, {});
}

function suspendSession() {
  const url = '/parliament/suspend';

  return requestSender.put(url, {});
}

function setActiveSession(sessionId) {
  const url = '/parliament/set-active-session';

  return requestSender.post(url, { sessionId });
}

export default {
  getSessionsList,
  finishSession,
  suspendSession,
  setActiveSession,
};
