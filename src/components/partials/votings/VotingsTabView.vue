<template>
  <div>
    <h3 class="mb-3">{{ $t('voting.votingsList') }}</h3>
    <loader :style="{ visibility: isLoading ? 'visible' : 'hidden' }" />
    <div class="mb-3 d-flex flex-column">
      <span>
        <v-icon color="grey">mdi-star</v-icon>
        {{ $t('voting.votingNotFinished') }}
      </span>
      <span class="my-2">
        <v-icon color="green">mdi-star</v-icon>
        {{ $t('voting.votingPassed') }}
      </span>
      <span>
        <v-icon color="red">mdi-star</v-icon>{{ $t('voting.votingFailed') }}
      </span>
    </div>
    <v-card>
      <v-tabs grow v-model="tab" background-color="primary" dark>
        <v-tab v-if="votingTypes.includes('DURING_VOTING')">{{
          $t('voting.votingInProgress')
        }}</v-tab>
        <v-tab v-if="votingTypes.includes('NOT_STARTED')">{{
          $t('voting.votingsReadyToStart')
        }}</v-tab>
        <v-tab v-if="votingTypes.includes('FINISHED')">{{
          $t('voting.finishedVotings')
        }}</v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item v-if="votingTypes.includes('DURING_VOTING')">
          <VotingExpansionTile :votings="duringVoting" />
        </v-tab-item>
        <v-tab-item v-if="votingTypes.includes('NOT_STARTED')">
          <VotingExpansionTile :votings="beforeVoting" />
        </v-tab-item>
        <v-tab-item v-if="votingTypes.includes('FINISHED')">
          <VotingExpansionTile :votings="finished" />
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';

import VotingExpansionTile from './VotingExpansionTile.vue';

export default {
  props: {
    votingTypes: {
      type: Array,
      default() {
        return ['NOT_STARTED', 'DURING_VOTING', 'FINISHED'];
      },
    },
    value: {
      type: Number,
    },
  },
  created() {
    this.$root.$on('closeVoting', () => {
      this.tab = 2;
    });
    this.$root.$on('openVoting', () => {
      this.tab = 0;
    });
  },
  data() {
    return {
      tab: this.value,
    };
  },
  watch: {
    tab(newValue) {
      this.$emit('input', newValue);
    },
    value(newValue) {
      this.tab = newValue;
    },
  },
  computed: {
    ...mapState('votingsManagement', ['isLoading']),
    ...mapGetters('votingsManagement', [
      'beforeVoting',
      'duringVoting',
      'finished',
    ]),
  },
  components: {
    VotingExpansionTile,
  },
};
</script>
