<template>
  <v-row v-if="votings.length === 0" justify="center">
    <div class="my-5">{{$t('voting.noVotings')}}</div>
  </v-row>
  <v-row v-else justify="center">
    <v-expansion-panels :focusable="true" :value="initialyExpandedIndex">
      <v-expansion-panel v-for="voting in votings" :key="voting.id">
        <VotingExpansionPanelContent :voting="voting" />
      </v-expansion-panel>
    </v-expansion-panels>
  </v-row>
</template>

<script>
import VotingExpansionPanelContent from './VotingExpansionPanelContent.vue';

export default {
  props: {
    votings: {
      type: Array,
      required: true,
    },
    initialyExpandedIndex: {
      type: Number,
      default() {
        return 0;
      },
    },
  },
  components: {
    VotingExpansionPanelContent,
  },
};
</script>
