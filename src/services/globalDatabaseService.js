import requestSender from '@/utils/requestSender';

function saveSessionToGlobal(sessionId) {
  const url = `/database/${sessionId}/save`;

  return requestSender.post(url);
}

export default {
  saveSessionToGlobal,
};
