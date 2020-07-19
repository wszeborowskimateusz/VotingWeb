<template>
  <div class="session__list">
    <div :style="{ visibility: isLoading ? 'visible' : 'hidden' }">
      <Loader />
    </div>
    <div>
      <h1 class="font-weight-bold pb-2">
        {{ $t('parliamentManagement.sessions') }}
      </h1>
      <button class="btn btn-primary mb-3">
        <i class="fas fa-upload"></i>
        {{ $t('parliamentManagement.uploadSession') }}
      </button>
      <div :title="$t('parliamentManagement.thisSessionIsActive')">
        <img :src="imageGetter.getImgUrl('filled.png')" height="50" />
        {{ $t('parliamentManagement.thisSessionIsActive') }}
        <tooltip modalName="changeActiveSessionIconTooltip">
          {{ $t('parliamentManagement.activeSessionDescription') }}
        </tooltip>
      </div>
      <div :title="$t('parliamentManagement.changeToActiveSession')">
        <img :src="imageGetter.getImgUrl('unfilled.png')" height="50" />
        {{ $t('parliamentManagement.changeToActiveSession') }}
      </div>
      <SessionListElement
        v-for="session in sessions"
        :key="session.id"
        :session="session"
      />
      <div
        v-if="!isLoading && (sessions == null || sessions.length === 0)"
        class="h3 mt-5 pre-formatted"
      >
        {{ $t('parliamentManagement.noSessionsDisclaimer') }}
      </div>
    </div>
  </div>
</template>
<style scoped>
.session__list {
  padding-bottom: 10vh;
}

.pre-formatted {
  white-space: pre;
}
</style>
<script>
import { mapActions, mapState } from 'vuex';
import SessionListElement from '../partials/SessionListElement.vue';
import imageGetter from '../../utils/imagesGetter';

export default {
  components: {
    SessionListElement,
  },
  data() {
    return {
      imageGetter,
    };
  },
  computed: {
    ...mapState('parliamentManagement', ['isLoading', 'sessions']),
  },
  methods: {
    ...mapActions('parliamentManagement', ['changeActiveSession']),
  },
};
</script>
