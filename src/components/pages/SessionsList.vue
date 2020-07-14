<template>
  <div>
    <Loader v-if="isLoading" />
    <div v-else>
      <h2 class="font-weight-bold py-2">{{$t('parliamentManagement.sessions')}}</h2>
      <SessionListElement
        v-for="session in sessions"
        :key="session.id"
        :session="session"
      />
    </div>
  </div>
</template>

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
