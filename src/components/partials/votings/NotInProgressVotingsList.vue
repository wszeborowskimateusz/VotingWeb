<template>
  <div>
    <h3 class="mb-3">{{ $t('voting.votingsList') }}</h3>
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
          secrecy: false,
          status: 'FINISHED',
          threshold: null,
          electionLead: 'Zbigniew Stonoga',
          options: [],
          results: [
            {
              wasSuccessful: false,
              inFavor: 45,
              against: 78,
              hold: 5,
              notVote: 9,
              specificVotes: [{ voter: 0, voteType: 'FOR' }, { voter: 1, voteType: 'FOR' }],
            },
          ],
        },
        {
          id: 12,
          name: 'Głosowanie ws. wybory ministrów',
          majority: 'RELATIVE',
          cardinality: 'MULTIPLE_CHOICE',
          secrecy: true,
          status: 'FINISHED',
          threshold: 2,
          electionLead: 'Zbigniew Stonoga',
          options: [
            { id: 1, name: 'Anna Winiarska' },
            { id: 2, name: 'Marta Rutkowska' },
            { id: 3, name: 'Bartosz Nurek' },
            { id: 4, name: 'Dawid Krefta' },
          ],
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
