import requestSender from '@/utils/requestSender';

function setParliamentDetails(session, userFile) {
  const url = '/preparations/details';

  const body = new FormData();
  body.append('session', JSON.stringify(session));
  body.append('userFile', userFile);

  return requestSender.postWithFile(url, body);
}

function generatePasswords(args) {
  let url = '/preparations/passwords';

  if (args.sessionId != null) {
    url += `?sessionId=${args.sessionId}`;
  }

  return requestSender.downloadFile(url, { password: args.password });
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
