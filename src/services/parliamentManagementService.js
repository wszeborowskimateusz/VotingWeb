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
  {
    id: 3,
    name: 'Sesja testowa 2',
    date: Date.now(),
    place: 'Kamień',
    electionLead: 'Weronika Truskawka',
    status: 'FINISHED_NOT_SAVED_TO_GLOBAL',
    isActive: false,
  },
  {
    id: 4,
    name: 'Sesja testowa 2',
    date: Date.now(),
    place: 'Kamień',
    electionLead: 'Weronika Truskawka',
    status: 'SUSPENDED',
    isActive: false,
  },
  {
    id: 5,
    name: 'Sesja testowa 2',
    date: Date.now(),
    place: 'Kamień',
    electionLead: 'Weronika Truskawka',
    status: 'IN_PROGRESS',
    isActive: true,
  },
  {
    id: 6,
    name: 'Sesja testowa 2',
    date: Date.now(),
    place: 'Kamień',
    electionLead: null,
    status: 'IN_PREPARTION',
    isActive: false,
  },
];

function getSessionsList() {
  // const url = '/parliament';

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

/* eslint-disable no-param-reassign */
async function setActiveSession(sessionId) {
  // const url = '/parliament/set-active-session';
  // return requestSender.post(url, { sessionId });
  dummySessionList.forEach((_, index, theArray) => {
    theArray[index].isActive = false;
    if (theArray[index].id === sessionId) {
      theArray[index].isActive = true;
    }
  });

  return null;
}
/* eslint-enable no-param-reassign */
export default {
  getSessionsList,
  finishSession,
  suspendSession,
  setActiveSession,
};
