<template>
  <div class="session__list">
    <Loader v-if="isLoading" />
    <div v-else>
      <h2 class="font-weight-bold py-2">
        {{ $t('parliamentManagement.sessions') }}
      </h2>
      <button class="btn btn-primary">
        <i class="fas fa-upload"></i>
        {{ $t('parliamentManagement.uploadSession') }}
      </button>
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
import Loader from '../partials/Loader.vue';

export default {
  components: {
    SessionListElement,
    Loader,
  },
  computed: {
    ...mapState('parliamentManagement', ['isLoading', 'sessions']),
  },
  methods: {
    ...mapActions('parliamentManagement', ['changeActiveSession']),
  },
};
</script>
