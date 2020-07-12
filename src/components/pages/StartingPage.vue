<template>
  <div v-if="isLoading" class="d-flex justify-content-center pt-5">
      <Loader/>
  </div>
  <div v-else-if="!activeSession">
    <SessionsList />
  </div>
  <div v-else>
    <component
      class="content"
      :is="getComponentByActiveSessionStatus()"
    ></component>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';

import SessionFinished from './SessionFinished.vue';
import SessionInProgress from './SessionInProgress.vue';
import SessionPreparation from './SessionPreparation.vue';
import SessionsList from './SessionsList.vue';
import Loader from '../partials/Loader.vue';

export default {
  computed: {
    ...mapGetters('parliamentManagement', ['activeSession']),
    ...mapState('parliamentManagement', ['isLoading']),
  },
  methods: {
    ...mapActions('parliamentManagement', ['loadSessions']),
    getComponentByActiveSessionStatus() {
      if (this.activeSession == null) {
        // TODO: Probably some error page
        return '';
      }
      switch (this.activeSession.status) {
        case 'FINISHED_NOT_SAVED_TO_GLOBAL':
        case 'FINISHED':
          return 'SessionFinished';
        case 'IN_PREPARATION_READY_TO_START':
        case 'IN_PREPARTION':
          return 'SessionPreparation';
        case 'IN_PROGRESS':
        case 'SUSPENDED':
          return 'SessionInProgress';
        default:
          break;
      }

      // TODO: Probably some error page
      return '';
    },
  },
  mounted() {
    this.loadSessions();
  },
  components: {
    SessionFinished,
    SessionInProgress,
    SessionPreparation,
    SessionsList,
    Loader,
  },
};
</script>
