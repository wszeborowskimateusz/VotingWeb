import requestSender from '@/utils/requestSender';

function getSessionsList() {
  // const url = '/parliament';

  const dummySessionList = [
    {
      id: 1,
      name: 'Sesja testowa',
      date: Date.now(),
      place: 'Bieszkowice',
      electionLead: 'Mikołaj Peszko',
      status: 'BEFORE_VOTING',
      isActive: true,
    },
    {
      id: 2,
      name: 'Sesja testowa 2',
      date: Date.now(),
      place: 'Kamień',
      electionLead: 'Weronika Truskawka',
      status: 'FINISHED',
      isActive: false,
    },
  ];

  // TODO: This is just a demmy return - connect real API when it is ready
  return new Promise((resolve) => {
    const wait = setTimeout(() => {
      clearTimeout(wait);
      resolve(dummySessionList);
    }, 2000);
  });
  // return requestSender.get(url);
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
