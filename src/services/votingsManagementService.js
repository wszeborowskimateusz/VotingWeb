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
  const url = `/votings/open/${votingId}`;

  return requestSender.post(url, {});
}

function closeVoting(votingId) {
  const url = `/votings/close/${votingId}`;

  return requestSender.post(url, {});
}

function getVotingResults(votingId) {
  const url = `/votings/results/${votingId}`;

  return requestSender.get(url);
}

function generateVotingReport(votingId) {
  const url = `/votings/${votingId}/report`;

  return requestSender.get(url);
}

function getAlreadyVotedList(votingId) {
  const url = `/votings/already-voted/${votingId}`;

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
