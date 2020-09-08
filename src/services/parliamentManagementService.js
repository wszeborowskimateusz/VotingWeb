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

function downloadSession(sessionId) {
  const url = `/parliament/${sessionId}/download`;

  return requestSender.downloadFile(url);
}

function uploadSession(sessionFile) {
  const url = '/parliament/upload';

  return requestSender.postWithFile(url, sessionFile);
}

async function setActiveSession(sessionId) {
  const url = '/parliament/set-active-session';

  return requestSender.post(url, { sessionId }).then((response) => {
    console.log(`got response ${response}`);
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
