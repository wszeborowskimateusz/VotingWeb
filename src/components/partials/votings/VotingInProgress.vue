<template>
  <div>
    <h3 class="mb-5">{{ $t(`voting.votingInProgress`) }}</h3>
    <VotingExpansionTile :votings="[votingInProgress]" :initialyExpandedIndex="0" />
  </div>
</template>

<script>
import VotingExpansionTile from './VotingExpansionTile.vue';

export default {
  data() {
    return {
      votingInProgress: {
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
    };
  },
  components: {
    VotingExpansionTile,
  },
};
</script>
