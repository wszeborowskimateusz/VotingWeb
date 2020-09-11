import requestSender from '@/utils/requestSender';

function getVotersList(sessionId) {
  const url = `/parliament/${sessionId}/voters`;

  return requestSender.get(url);
}

function changeVoterBlockStatus(voterId, isBlocked) {
  const url = `/voters/block-voter/${voterId}`;

  return requestSender.post(url, { isBlocked });
}

export default {
  getVotersList,
  changeVoterBlockStatus,
};
