import requestSender from '@/utils/requestSender';

function getVotersList(sessionId) {
  const url = `/parliament/${sessionId}/voters`;

  return requestSender.get(url);
}

function changeVoterBlockStatus(voterId, isBlocked) {
  const url = `/voters/${voterId}/block-voter`;

  return requestSender.put(url, { isBlocked });
}

export default {
  getVotersList,
  changeVoterBlockStatus,
};
