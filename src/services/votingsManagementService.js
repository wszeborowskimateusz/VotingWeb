import requestSender from '@/utils/requestSender';

const demoVotings = [
  {
    id: 10,
    name:
      'Głosowanie ws. wyboru członków Komisji Prawno Rewizyjnej: kandydat(ka)',
    majority: 'ABSOLUTE',
    cardinality: 'MULTIPLE_CHOICE',
    secrecy: true,
    status: 'DURING_VOTING',
    threshold: 2,
    electionLead: 'Zbigniew Stonoga',
    options: [
      { id: 1, name: 'Anna Winiarska' },
      { id: 2, name: 'Marta Rutkowska' },
      { id: 3, name: 'Bartosz Nurek' },
      { id: 4, name: 'Dawid Krefta' },
    ],
  },
  {
    id: 11,
    name:
      'Głosowanie ws. wyboru członków Komisji Prawno Rewizyjnej: kandydat(ka)',
    majority: 'RELATIVE',
    cardinality: 'MULTIPLE_CHOICE',
    secrecy: false,
    status: 'NOT_STARTED',
    threshold: 2,
    electionLead: 'Zbigniew Stonoga',
    options: [
      { id: 1, name: 'Anna Winiarska' },
      { id: 2, name: 'Marta Rutkowska' },
      { id: 3, name: 'Bartosz Nurek' },
      { id: 4, name: 'Dawid Krefta' },
    ],
  },
  {
    id: 12,
    name:
      'Głosowanie ws. wyboru członków Komisji Prawno Rewizyjnej: kandydat(ka)',
    majority: 'RELATIVE',
    cardinality: 'SINGLE_CHOICE',
    secrecy: true,
    status: 'FINISHED',
    threshold: null,
    electionLead: 'Zbigniew Stonoga',
    options: [],
    results: {
      wasSuccessful: false,
      inFavor: 45,
      against: 78,
      hold: 5,
      notVote: 9,
    },
  },
  {
    id: 13,
    name: 'Głosowanie ws. wybory ministrów',
    majority: 'RELATIVE',
    cardinality: 'MULTIPLE_CHOICE',
    secrecy: false,
    status: 'FINISHED',
    threshold: 2,
    electionLead: 'Zbigniew Stonoga',
    options: [
      { id: 1, name: 'Anna Winiarska' },
      { id: 2, name: 'Marta Rutkowska' },
      { id: 3, name: 'Bartosz Nurek' },
      { id: 4, name: 'Dawid Krefta' },
    ],
    results: {
      1: {
        wasSuccessful: true,
        inFavor: 90,
        against: 2,
        hold: 6,
        notVote: 1,
        specificVotes: [
          {
            voter: { name: 'Jan Rokita', index: '156845' },
            voteType: 'HOLD',
          },
          {
            voter: { name: 'John Bonjovi', index: '456123' },
            voteType: 'HOLD',
          },
          {
            voter: { name: 'Fidel Castro', index: '123489' },
            voteType: 'FOR',
          },
          {
            voter: { name: 'Frank Sinatra', index: '478921' },
            voteType: 'FOR',
          },
          {
            voter: { name: 'Blue Budy', index: '354223' },
            voteType: 'FOR',
          },
        ],
      },
      2: {
        wasSuccessful: false,
        inFavor: 45,
        against: 78,
        hold: 5,
        notVote: 9,
        specificVotes: [
          {
            voter: { name: 'Jan Rokita', index: '156845' },
            voteType: 'FOR',
          },
          {
            voter: { name: 'John Bonjovi', index: '456123' },
            voteType: 'FOR',
          },
        ],
      },
      3: {
        wasSuccessful: false,
        inFavor: 12,
        against: 90,
        hold: 2,
        notVote: 1,
        specificVotes: [
          {
            voter: { name: 'Jan Rokita', index: '156845' },
            voteType: 'HOLD',
          },
          {
            voter: { name: 'John Bonjovi', index: '456123' },
            voteType: 'HOLD',
          },
          {
            voter: { name: 'Fidel Castro', index: '123489' },
            voteType: 'AGAINST',
          },
          {
            voter: { name: 'Frank Sinatra', index: '478921' },
            voteType: 'AGAINST',
          },
          {
            voter: { name: 'Blue Budy', index: '354223' },
            voteType: 'FOR',
          },
        ],
      },
      4: {
        wasSuccessful: true,
        inFavor: 88,
        against: 12,
        hold: 11,
        notVote: 7,
        specificVotes: [
          {
            voter: { name: 'Jan Rokita', index: '156845' },
            voteType: 'HOLD',
          },
          {
            voter: { name: 'John Bonjovi', index: '456123' },
            voteType: 'HOLD',
          },
          {
            voter: { name: 'Fidel Castro', index: '123489' },
            voteType: 'AGAINST',
          },
          {
            voter: { name: 'Frank Sinatra', index: '478921' },
            voteType: 'AGAINST',
          },
          {
            voter: { name: 'Blue Budy', index: '354223' },
            voteType: 'FOR',
          },
        ],
      },
    },
  },
];

function getVotingsList() {
  // TODO: This is just a demmy return - connect real API when it is ready
  return new Promise((resolve) => {
    const wait = setTimeout(() => {
      clearTimeout(wait);
      resolve(demoVotings);
    }, 2000);
  });
  // const url = '/votings';

  // return requestSender.get(url);
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
  getAlreadyVotedList,
};
