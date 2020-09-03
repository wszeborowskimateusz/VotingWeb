import requestSender from '@/utils/requestSender';

function getSessionsList() {
  const url = '/parliament';

  return requestSender.get(url);
}

function finishSession(sessionId) {
  const url = `/parliament/${sessionId}/finish`;

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

  return requestSender.post(url, { sessionId });
}

export default {
  getSessionsList,
  finishSession,
  suspendSession,
  startSession,
  resumeSession,
  removeSession,
  downloadSession,
  uploadSession,
  setActiveSession,
};
