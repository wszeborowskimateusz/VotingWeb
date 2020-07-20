<template>
  <div v-if="activeSession == null">TODO: Probably some error</div>
  <div v-else>
    <div v-if="activeSession.status === 'SUSPENDED'">
      <button class="btn btn-secondary mb-5">
        <i class="far fa-arrow-alt-circle-right mr-1"></i
        >{{ $t('sessionActions.resumeSession') }}
      </button>
    </div>
    <div v-else class="d-flex flex-row justify-content-center mb-5">
      <button class="btn btn-secondary mx-3">
        <i class="far fa-pause-circle mr-1"></i
        >{{ $t('sessionActions.suspendSession') }}
      </button>
      <button class="btn btn-danger mx-3">
        <i class="far fa-stop-circle mr-1"></i
        >{{ $t('sessionActions.finishSession') }}
      </button>
    </div>
    <v-divider />
    <button class="btn btn-success my-5" @click="$modal.show('newEditVoting')">
      {{ $t('voting.newVoting') }}
    </button>
    <v-divider />
    <div v-if="activeSession.status === 'IN_PROGRESS'" class="my-5">
      <VotingInProgress class="my-5"/>
      <v-divider class="my-5" :light="true"></v-divider>
    </div>
    <NotInProgressVotingsList class="my-5"/>
    <NewEditVoting />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import VotingInProgress from '../partials/votings/VotingInProgress.vue';
import NotInProgressVotingsList from '../partials/votings/NotInProgressVotingsList.vue';
import NewEditVoting from '../partials/votings/NewEditVoting.vue';

export default {
  computed: {
    ...mapGetters('parliamentManagement', ['activeSession']),
  },
  components: {
    VotingInProgress,
    NotInProgressVotingsList,
    NewEditVoting,
  },
};
</script>
