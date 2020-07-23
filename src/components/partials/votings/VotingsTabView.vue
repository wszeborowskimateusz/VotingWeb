<template>
  <div>
    <h3 class="mb-3">{{ $t('voting.votingsList') }}</h3>
    <div class="mb-3 d-flex justify-content-around">
      <span>
        <v-icon color="grey">mdi-star</v-icon>
        {{ $t('voting.votingNotFinished') }}
      </span>
      <span>
        <v-icon color="green">mdi-star</v-icon>
        {{ $t('voting.votingPassed') }}
      </span>
      <span>
        <v-icon color="red">mdi-star</v-icon>{{ $t('voting.votingFailed') }}
      </span>
    </div>

    <v-card>
      <v-tabs grow v-model="tab" background-color="primary" dark>
        <v-tab v-if="votingTypes.includes('NOT_STARTED')">{{
          $t('voting.votingInProgress')
        }}</v-tab>
        <v-tab v-if="votingTypes.includes('DURING_VOTING')">{{
          $t('voting.votingsReadyToStart')
        }}</v-tab>
        <v-tab v-if="votingTypes.includes('FINISHED')">{{
          $t('voting.finishedVotings')
        }}</v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item v-if="votingTypes.includes('NOT_STARTED')">
          <VotingExpansionTile :votings="votingInProgress" />
        </v-tab-item>
        <v-tab-item v-if="votingTypes.includes('DURING_VOTING')">
          <VotingExpansionTile :votings="notStartedVotings" />
        </v-tab-item>
        <v-tab-item v-if="votingTypes.includes('FINISHED')">
          <VotingExpansionTile :votings="finishedVotings" />
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </div>
</template>

<script>
import VotingExpansionTile from './VotingExpansionTile.vue';

export default {
  props: {
    votingTypes: {
      type: Array,
      default() {
        return ['NOT_STARTED', 'DURING_VOTING', 'FINISHED'];
      },
    },
  },
  data() {
    return {
      tab: null,
      votingsList: [
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
    votingInProgress() {
      return this.votingsList.filter(
        (voting) => voting.status === 'DURING_VOTING',
      );
    },
  },
  components: {
    VotingExpansionTile,
  },
};
</script>
