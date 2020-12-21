<template>
  <v-row justify="center">
    <loader v-if="isLoading" />
    <div class="my-5" v-else-if="votings.length === 0">
      {{ $t('voting.noVotings') }}
    </div>
    <v-expansion-panels v-else :focusable="true" :value="initialyExpandedIndex">
      <v-expansion-panel v-for="(voting, index) in votings" :key="voting.id">
        <VotingExpansionPanelContent
          :voting="voting"
          :color="
            index % 2 === 0
              ? $vuetify.theme.isDark
                ? 'grey darken-2'
                : 'grey lighten-5'
              : $vuetify.theme.isDark
              ? 'blue-grey darken-2'
              : 'blue-grey lighten-4'
          "
        />
      </v-expansion-panel>
    </v-expansion-panels>
  </v-row>
</template>

<script>
import { mapState } from 'vuex';
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
  computed: {
    ...mapState('votingsManagement', ['isLoading']),
  },
  components: {
    VotingExpansionPanelContent,
  },
};
</script>
