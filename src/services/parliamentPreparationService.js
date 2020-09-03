import requestSender from '@/utils/requestSender';

function setParliamentDetails(session, userFile) {
  const url = '/preparations/details';

  const body = new FormData();
  body.append('session', JSON.stringify(session));
  body.append('userFile', userFile);

  return requestSender.postWithFile(url, body);
}

function generatePasswords() {
  const url = '/preparations/get-pass';

  return requestSender.downloadFile(url);
}

function editParliamentDetails(parliamentDetails) {
  const url = '/preparations/details';

  return requestSender.put(url, parliamentDetails);
}

export default {
  setParliamentDetails,
  generatePasswords,
  editParliamentDetails,
};
