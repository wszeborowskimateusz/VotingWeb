<template>
  <div v-if="activeSession == null">TODO: Probably some error</div>
  <div v-else>
    <div v-if="activeSession.status === 'SUSPENDED'">
      <v-btn color="normal" class="mb-5">
        <v-icon left>mdi-play</v-icon>
        {{ $t('sessionActions.resumeSession') }}
      </v-btn>
    </div>
    <div v-else class="d-flex flex-row justify-content-center mb-5">
      <v-btn class="mx-3">
        <v-icon left>mdi-pause</v-icon>
        {{ $t('sessionActions.suspendSession') }}
      </v-btn>
      <v-btn color="error" class="mx-3">
        <v-icon left>mdi-stop</v-icon>
        {{ $t('sessionActions.finishSession') }}
      </v-btn>
    </div>
    <v-divider />
    <v-btn color="success" class="my-5" @click="$modal.show('newEditVoting')">
      {{ $t('voting.newVoting') }}
    </v-btn>
    <v-divider />
    <VotingsTabView class="my-5" :votingTypes="getAllowesVotingTypes()" />
    <NewEditVoting />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import VotingsTabView from '../partials/votings/VotingsTabView.vue';
import NewEditVoting from '../partials/votings/NewEditVoting.vue';

export default {
  computed: {
    ...mapGetters('parliamentManagement', ['activeSession']),
  },
  mounted() {
    this.loadVotings();
  },
  components: {
    VotingsTabView,
    NewEditVoting,
  },
  methods: {
    ...mapActions('votingsManagement', ['loadVotings']),
    getAllowesVotingTypes() {
      if (this.activeSession.status === 'IN_PROGRESS') {
        return ['NOT_STARTED', 'DURING_VOTING', 'FINISHED'];
      }

      return ['FINISHED'];
    },
  },
};
</script>
