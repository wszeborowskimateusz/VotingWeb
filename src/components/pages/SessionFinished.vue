<template>
  <div>
    <v-btn
      color="cyan"
      class="mb-5"
      dark
      v-if="activeSession.status === 'FINISHED_NOT_SAVED_TO_GLOBAL'"
    >
      <v-icon left>mdi-content-save</v-icon>
      {{ $t('sessionActions.saveToGlobal') }}
    </v-btn>
    <v-btn
      color="error"
      class="mb-5"
      dark
      v-if="activeSession.status === 'FINISHED'"
    >
      <v-icon left>mdi-delete</v-icon>
      {{ $t('sessionActions.removeSession') }}
    </v-btn>
    <v-divider/>
    <VotingsTabView :votingTypes="['FINISHED']" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import VotingsTabView from '../partials/votings/VotingsTabView.vue';

export default {
  computed: {
    ...mapGetters('parliamentManagement', ['activeSession']),
  },
  components: {
    VotingsTabView,
  },
};
</script>
