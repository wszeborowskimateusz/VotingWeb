import requestSender from '@/utils/requestSender';

function saveSessionToGlobal(sessionId) {
  const url = `/database/${sessionId}/save`;

  return requestSender.put(url);
}

export default {
  saveSessionToGlobal,
};
