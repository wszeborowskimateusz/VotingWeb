import requestSender from '@/utils/requestSender';

const demoMembers = [
  {
    id: '1',
    fullName: 'Jon Snow',
    index: '123457',
    mandateNumber: '0',
    absent: false,
    isBlocked: false,
    isElectionLead: false,
    isInElectionCommittee: false,
    hasVote: true,
  },
  {
    id: '2',
    fullName: 'Jon Travolta',
    index: '123451',
    mandateNumber: '1',
    absent: true,
    isBlocked: false,
    isElectionLead: false,
    isInElectionCommittee: false,
    hasVote: true,
  },
  {
    id: '3',
    fullName: 'Sławomir Mentzen',
    index: '123487',
    mandateNumber: '2',
    absent: false,
    isBlocked: true,
    isElectionLead: false,
    isInElectionCommittee: false,
    hasVote: true,
  },
  {
    id: '4',
    fullName: 'Borris Johnson',
    index: '123467',
    absent: false,
    isBlocked: false,
    isElectionLead: false,
    isInElectionCommittee: false,
    hasVote: false,
  },
  {
    id: '5',
    fullName: 'Bill Gates',
    index: '123434',
    mandateNumber: '4000',
    absent: false,
    isBlocked: false,
    isElectionLead: false,
    isInElectionCommittee: true,
    hasVote: true,
  },
  {
    id: '6',
    fullName: 'Melinda Gates',
    index: '234123',
    mandateNumber: '5',
    absent: true,
    isBlocked: true,
    isElectionLead: false,
    isInElectionCommittee: false,
    hasVote: true,
  },
  {
    id: '7',
    fullName: 'Steven Boris',
    index: '123452',
    mandateNumber: '6',
    absent: false,
    isBlocked: false,
    isElectionLead: true,
    isInElectionCommittee: true,
    hasVote: true,
  },
  {
    id: '8',
    fullName: 'Bill Gates',
    index: '123434',
    mandateNumber: '7',
    absent: false,
    isBlocked: false,
    isElectionLead: false,
    isInElectionCommittee: true,
    hasVote: true,
  },
  {
    id: '9',
    fullName: 'Melinda Gates',
    index: '234123',
    mandateNumber: '8',
    absent: true,
    isBlocked: true,
    isElectionLead: false,
    isInElectionCommittee: false,
    hasVote: true,
  },
  {
    id: '10',
    fullName: 'Steven Boris',
    index: '123452',
    mandateNumber: '9',
    absent: false,
    isBlocked: false,
    isElectionLead: false,
    isInElectionCommittee: true,
    hasVote: true,
  },
  {
    id: '11',
    fullName: 'Bill Gates',
    index: '123434',
    mandateNumber: '10',
    absent: false,
    isBlocked: false,
    isElectionLead: false,
    isInElectionCommittee: true,
    hasVote: true,
  },
  {
    id: '12',
    fullName: 'Melinda Gates',
    index: '234123',
    mandateNumber: '11',
    absent: true,
    isBlocked: true,
    isElectionLead: false,
    isInElectionCommittee: false,
    hasVote: true,
  },
  {
    id: '13',
    fullName: 'Steven Boris',
    index: '123452',
    mandateNumber: '12',
    absent: false,
    isBlocked: false,
    isElectionLead: false,
    isInElectionCommittee: true,
    hasVote: true,
  },
  {
    id: '14',
    fullName: 'Bill Gates',
    index: '123434',
    mandateNumber: '13',
    absent: false,
    isBlocked: false,
    isElectionLead: false,
    isInElectionCommittee: true,
    hasVote: true,
  },
  {
    id: '15',
    fullName: 'Melinda Gates',
    index: '234123',
    mandateNumber: '1412',
    absent: true,
    isBlocked: true,
    isElectionLead: false,
    isInElectionCommittee: false,
    hasVote: true,
  },
  {
    id: '16',
    fullName: 'Steven Boris',
    index: '123452',
    mandateNumber: '15',
    absent: false,
    isBlocked: false,
    isElectionLead: false,
    isInElectionCommittee: true,
    hasVote: true,
  },
];

function getVotersList(sessionId) {
  console.log(`Getting members from server for id: ${sessionId}`);
  return new Promise((resolve) => {
    const wait = setTimeout(() => {
      clearTimeout(wait);
      resolve(demoMembers);
    }, 2000);
  });

  // const url = '/voters';

  // return requestSender.get(url);
}

function changeVoterBlockStatus(voterId, isBlocked) {
  const url = `voters/block-voter/${voterId}`;

  return requestSender.post(url, { isBlocked });
}

export default {
  getVotersList,
  changeVoterBlockStatus,
};
