import requestSender from '@/utils/requestSender';


// TODO: Handle sending the file
function loadVotersList(votersList) {
  const url = '/preparations/voters-list';

  return requestSender.postFile(url, { votersList });
}

function setParliamentDetails(parliamentDetails) {
  const url = '/preparations/details';

  return requestSender.post(url, parliamentDetails);
}

function generatePasswords() {
  const url = '/preparations/get-pass';

  return requestSender.get(url);
}

function getPreparedSession() {
  const url = '/preparations/details';

  return requestSender.getFile(url);
}

// TODO: Handle file sending
function loadPreparedSession(sessionFile) {
  const url = '/preparations/upload';

  return requestSender.postFile(url, sessionFile);
}

function editParliamentDetails(parliamentDetails) {
  const url = '/preparations/details';

  return requestSender.put(url, parliamentDetails);
}

export default {
  loadVotersList,
  setParliamentDetails,
  generatePasswords,
  getPreparedSession,
  loadPreparedSession,
  editParliamentDetails,
};
