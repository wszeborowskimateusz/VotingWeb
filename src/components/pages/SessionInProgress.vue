<template>
  <div v-if="activeSession == null">TODO: Probably some error</div>
  <div v-else>
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
