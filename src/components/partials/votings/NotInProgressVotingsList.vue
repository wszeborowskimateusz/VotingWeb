<template>
  <div>
    <h3 class="mb-3">{{ $t('voting.votingsList') }}</h3>
    <div class="mb-3">
      <v-icon color="grey">mdi-star</v-icon> -
      {{ $t('voting.votingNotFinished') }}
      <v-icon color="green">mdi-star</v-icon> - {{ $t('voting.votingPassed') }}
      <v-icon color="red">mdi-star</v-icon> - {{ $t('voting.votingFailed') }}
    </div>

    <v-card>
      <v-tabs grow v-model="tab" background-color="primary" dark>
        <v-tab>{{ $t('voting.votingsReadyToStart') }}</v-tab>
        <v-tab>{{ $t('voting.finishedVotings') }}</v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item>
          <VotingExpansionTile :votings="notStartedVotings" />
        </v-tab-item>
        <v-tab-item>
          <VotingExpansionTile :votings="finishedVotings" />
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </div>
</template>

<script>
import VotingExpansionTile from './VotingExpansionTile.vue';

export default {
  data() {
    return {
      tab: null,
      votingsList: [
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
          id: 12,
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
                { voter: 0, voteType: 'HOLD' },
                { voter: 1, voteType: 'HOLD' },
                { voter: 1, voteType: 'FOR' },
                { voter: 1, voteType: 'FOR' },
                { voter: 1, voteType: 'FOR' },
              ],
            },
            2: {
              wasSuccessful: false,
              inFavor: 45,
              against: 78,
              hold: 5,
              notVote: 9,
              specificVotes: [
                { voter: 0, voteType: 'FOR' },
                { voter: 1, voteType: 'FOR' },
              ],
            },
            3: {
              wasSuccessful: false,
              inFavor: 12,
              against: 90,
              hold: 2,
              notVote: 1,
              specificVotes: [
                { voter: 0, voteType: 'AGAINST' },
                { voter: 1, voteType: 'AGAINST' },
                { voter: 1, voteType: 'FOR' },
                { voter: 1, voteType: 'AGAINST' },
                { voter: 1, voteType: 'FOR' },
              ],
            },
            4: {
              wasSuccessful: true,
              inFavor: 88,
              against: 12,
              hold: 11,
              notVote: 7,
              specificVotes: [
                { voter: 0, voteType: 'FOR' },
                { voter: 1, voteType: 'FOR' },
                { voter: 1, voteType: 'FOR' },
                { voter: 1, voteType: 'AGAINS' },
                { voter: 1, voteType: 'HOLD' },
              ],
            },
          },
        },
      ],
    };
  },
  computed: {
    notStartedVotings() {
      return this.votingsList.filter(
        (voting) => voting.status === 'NOT_STARTED',
      );
    },
    finishedVotings() {
      return this.votingsList.filter((voting) => voting.status === 'FINISHED');
    },
  },
  components: {
    VotingExpansionTile,
  },
};
</script>
