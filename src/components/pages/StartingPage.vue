<template>
  <Loader v-if="isLoading" />
  <div v-else-if="!activeSession">
    <SessionsList />
  </div>
  <div v-else class=" bottom-margin">
    <h1 class="my-2 font-weight-bold">
      {{ $t('parliamentManagement.session') }}: {{ activeSession.name }}
    </h1>
    <session-status-info
      :status="activeSession.status"
      modalName="homePageActiveSessionStatus"
    />
    <component
      class="mt-5"
      :is="getComponentByActiveSessionStatus()"
    ></component>
  </div>
</template>

<style scoped>
.bottom-margin {
  margin-bottom: 10vh;
}
</style>

<script>
import { mapState, mapGetters } from 'vuex';

import SessionFinished from './SessionFinished.vue';
import SessionInProgress from './SessionInProgress.vue';
import SessionPreparation from './SessionPreparation.vue';
import SessionsList from './SessionsList.vue';
import SessionStatusInfo from '../partials/SessionStatusInfo.vue';

export default {
  computed: {
    ...mapGetters('parliamentManagement', ['activeSession']),
    ...mapState('parliamentManagement', ['isLoading']),
  },
  methods: {
    getComponentByActiveSessionStatus() {
      if (this.activeSession == null) {
        // TODO: Probably some error page
        return '';
      }
      switch (this.activeSession.status) {
        case 'FINISHED_NOT_SAVED_TO_GLOBAL':
        case 'FINISHED':
          return 'SessionFinished';
        case 'BEFORE_VOTING':
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
  components: {
    SessionFinished,
    SessionInProgress,
    SessionPreparation,
    SessionsList,
    SessionStatusInfo,
  },
};
</script>
