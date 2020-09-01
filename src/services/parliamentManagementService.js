import requestSender from '@/utils/requestSender';

const dummySessionList = [
  {
    id: 1,
    name: 'Sesja testowa',
    date: Date.now(),
    place: 'Bieszkowice',
    electionLead: null,
    status: 'BEFORE_VOTING',
    isActive: false,
    electionCommittee: [],
  },
  {
    id: 2,
    name: 'Sesja testowa 2',
    date: Date.now(),
    place: 'Kamień',
    electionLead: '4',
    electionCommittee: ['1', '2', '3', '5'],
    status: 'FINISHED',
    isActive: false,
  },
  {
    id: 3,
    name: 'Sesja testowa 2',
    date: Date.now(),
    place: 'Kamień',
    electionLead: '3',
    electionCommittee: ['1', '2', '4', '5'],
    status: 'FINISHED_NOT_SAVED_TO_GLOBAL',
    isActive: false,
  },
  {
    id: 4,
    name: 'Sesja testowa 2',
    date: Date.now(),
    place: 'Kamień',
    electionLead: '2',
    electionCommittee: ['1', '6', '3', '5'],
    status: 'SUSPENDED',
    isActive: false,
  },
  {
    id: 5,
    name: 'Sesja testowa 2',
    date: Date.now(),
    place: 'Kamień',
    electionLead: '1',
    electionCommittee: ['7', '2', '3', '5'],
    status: 'IN_PROGRESS',
    isActive: true,
  },
  {
    id: 6,
    name: 'Sesja testowa 2',
    date: Date.now(),
    place: 'Kamień',
    electionLead: null,
    status: 'IN_PREPARATION',
    isActive: false,
  },
];

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

  return requestSender.put(url, {});
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
