import requestSender from '@/utils/requestSender';

function setParliamentDetails(session, userFile) {
  const url = '/preparations/details';

  const body = new FormData();
  body.append('session', JSON.stringify(session));
  body.append('userFile', userFile);

  return requestSender.postWithFile(url, body);
}

function generatePasswords(sessionId) {
  let url = '/preparations/passwords';

  if (sessionId != null) {
    url += `?sessionId=${sessionId}`;
  }

  return requestSender.downloadFile(url);
}

function editParliamentDetails(parliamentDetails) {
  const url = '/preparations/details';

  console.log(parliamentDetails);

  return requestSender.put(url, parliamentDetails);
}

export default {
  setParliamentDetails,
  generatePasswords,
  editParliamentDetails,
};
