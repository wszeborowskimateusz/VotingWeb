import requestSender from '@/utils/requestSender';

function getVotingsList() {
  const url = '/votings?includeResults=true';

  return requestSender.get(url);
}

function addVoting(voting) {
  const url = '/votings';

  return requestSender.post(url, voting);
}

function editVoting(votingId, voting) {
  const url = `/votings/${votingId}`;

  return requestSender.put(url, voting);
}

function deleteVoting(votingId) {
  const url = `/votings/${votingId}`;

  return requestSender.delete(url);
}

function openVoting(votingId) {
  const url = `/votings/${votingId}/open`;

  return requestSender.put(url, {});
}

function closeVoting(votingId) {
  const url = `/votings/${votingId}/close`;

  return requestSender.put(url, {});
}

function getVotingResults(votingId) {
  const url = `/votings/${votingId}/results`;

  return requestSender.get(url);
}

function generateVotingReport(votingId) {
  const url = `/votings/${votingId}/report`;

  return requestSender.downloadFile(url);
}

function getAlreadyVotedList(votingId) {
  const url = `/votings/${votingId}/already-voted`;

  return requestSender.get(url);
}

export default {
  getVotingsList,
  addVoting,
  editVoting,
  deleteVoting,
  openVoting,
  closeVoting,
  getVotingResults,
  generateVotingReport,
  getAlreadyVotedList,
};
