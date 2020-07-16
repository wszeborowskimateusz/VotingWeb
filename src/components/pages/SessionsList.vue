<template>
  <div class="session__list">
    <Loader v-if="isLoading" />
    <div v-else>
      <h1 class="font-weight-bold py-2">
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
    </div>
  </div>
</template>
<style scoped>
.session__list {
  padding-bottom: 10vh;
}
</style>
<script>
import { mapActions, mapState } from 'vuex';
import SessionListElement from '../partials/SessionListElement.vue';
import Tooltip from '../partials/Tooltip.vue';
import Loader from '../partials/Loader.vue';
import imageGetter from '../../utils/imagesGetter';

export default {
  components: {
    SessionListElement,
    Loader,
    Tooltip,
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
