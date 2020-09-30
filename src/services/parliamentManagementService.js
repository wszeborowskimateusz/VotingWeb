import requestSender from '@/utils/requestSender';
import tokenUtils from '../utils/tokenUtils';

function getSessionsList() {
  const url = '/parliament';

  return requestSender.get(url);
}

function finishSession(sessionId) {
  const url = `/parliament/${sessionId}/finish`;

  return requestSender.put(url, {});
}

function readySession(sessionId) {
  const url = `/parliament/${sessionId}/ready`;

  return requestSender.put(url, {});
}

function startSession(sessionId) {
  const url = `/parliament/${sessionId}/start`;

  return requestSender.put(url, {});
}

function suspendSession(sessionId) {
  const url = `/parliament/${sessionId}/suspend`;

  return requestSender.put(url, {});
}

function resumeSession(sessionId) {
  const url = `/parliament/${sessionId}/resume`;

  return requestSender.put(url, {});
}

function removeSession(sessionId) {
  const url = `/parliament/${sessionId}/remove`;

  return requestSender.put(url, {});
}

function downloadSession(args) {
  const url = `/parliament/${args.sessionId}/download`;

  return requestSender.downloadFile(url, { password: args.password });
}

function uploadSession(args) {
  const url = '/parliament/upload';

  const body = new FormData();
  body.append('sessionFile', args.sessionFile);
  body.append('password', args.password);

  return requestSender.postWithFile(url, body);
}

async function setActiveSession(sessionId) {
  const url = '/parliament/set-active-session';

  return requestSender.post(url, { sessionId }).then((response) => {
    tokenUtils.setToken(JSON.stringify(response.token));
    return response;
  });
}

export default {
  getSessionsList,
  finishSession,
  suspendSession,
  readySession,
  startSession,
  resumeSession,
  removeSession,
  downloadSession,
  uploadSession,
  setActiveSession,
};
