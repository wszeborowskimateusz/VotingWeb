<template>
  <div>
    <v-btn
      color="error"
      class="mb-5"
      dark
      v-if="activeSession.status === 'FINISHED'"
    >
      <v-icon left>mdi-delete</v-icon>
      {{ $t('sessionActions.removeSession') }}
    </v-btn>
    <v-divider />
    <VotingsTabView :votingTypes="['FINISHED']" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import VotingsTabView from '../partials/votings/VotingsTabView.vue';

export default {
  computed: {
    ...mapGetters('parliamentManagement', ['activeSession']),
  },
  methods: {
    ...mapActions('votingsManagement', ['loadVotings']),
  },
  mounted() {
    this.loadVotings();
  },
  components: {
    VotingsTabView,
  },
};
</script>
