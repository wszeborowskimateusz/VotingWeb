<template>
  <div>
    <v-btn
      color="error"
      class="mb-5"
      dark
      v-if="activeSession.status === 'FINISHED'"
      @click="showConfirmationDialog = true"
    >
      <v-icon left>mdi-delete</v-icon>
      {{ $t('sessionActions.removeSession') }}
    </v-btn>
    <v-divider />
    <VotingsTabView :votingTypes="['FINISHED']" />
    <ConfirmationDialog
      :header="
        $t('sessionActions.areYouSureToRemove', { sessionName: activeSession.name })
      "
      :description="$t('sessionActions.actionIsIrreversible')"
      v-model="showConfirmationDialog"
      @callback="removeSession(activeSession.id)"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import VotingsTabView from '../partials/votings/VotingsTabView.vue';

export default {
  data() {
    return {
      showConfirmationDialog: false,
    };
  },
  computed: {
    ...mapGetters('parliamentManagement', ['activeSession']),
  },
  methods: {
    ...mapActions('votingsManagement', ['loadVotings']),
    ...mapActions('parliamentManagement', ['removeSession']),
  },
  mounted() {
    this.loadVotings();
  },
  components: {
    VotingsTabView,
  },
};
</script>
