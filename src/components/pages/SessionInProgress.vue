<template>
  <div v-if="activeSession == null">
    <!-- TODO: Probably some error -->
  </div>
  <div v-else>
    <v-divider />
    <v-btn
      v-if="activeSession.status === 'IN_PROGRESS'"
      color="success"
      class="my-5"
      @click="$modal.show('newEditVoting')"
    >
      {{ $t('voting.newVoting') }}
    </v-btn>
    <v-divider v-if="activeSession.status === 'IN_PROGRESS'" />
    <VotingsTabView
      class="my-5"
      :votingTypes="getAllowedVotingTypes()"
      v-model="selectedVotingTab"
    />
    <NewEditVoting @finishSuccess="selectedVotingTab = 1" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import VotingsTabView from '../partials/votings/VotingsTabView.vue';
import NewEditVoting from '../partials/votings/NewEditVoting.vue';

export default {
  data() {
    return {
      selectedVotingTab: 0,
    };
  },
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
    getAllowedVotingTypes() {
      if (this.activeSession.status === 'IN_PROGRESS') {
        return ['NOT_STARTED', 'DURING_VOTING', 'FINISHED'];
      }

      return ['FINISHED'];
    },
  },
};
</script>
