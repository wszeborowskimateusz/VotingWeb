<template>
  <nav class="nav navbar navbar-expand-xl sticky-top shadow">
    <button
      class="navbar-toggler navbar-light"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul v-if="status.loggedIn" class="navbar-nav flex-fill">
        <li class="nav-item">
          <button class="btn btn-primary mr-3">
            <i class="fas fa-plus-square"></i>
            {{ $t('parliamentManagement.newSession') }}
          </button>
        </li>
        <li class="nav-item align-items-center">
          <router-link to="/" class="nav-link">
            {{ $t('parliamentManagement.sessions') }}
          </router-link>
        </li>
      </ul>
      <!--Keep the layout consistent-->
      <div v-else class="flex-fill"></div>
      <ul class="nav navbar-nav">
        <li v-if="activeSession" class="nav-item mr-4">
          <a @click="$modal.show('activeSessionModal')"
            >{{ $t('parliamentManagement.activeSession') }}:
            {{ activeSession.name }}</a
          >
        </li>
        <li class="nav-item">
          <button
            v-if="status.loggedIn"
            class="btn btn-outline-dark mr-3"
            @click="logout()"
          >
            <i class="fas fa-sign-out-alt"></i> {{ $t('login.logout') }}
          </button>
        </li>
        <li class="nav-item">
          <LocaleSwitcher />
        </li>
      </ul>
      <ActiveSessionModal></ActiveSessionModal>
    </div>
  </nav>
</template>

<style scoped>
.navbar-nav .nav-item {
  padding-top: 0;
  padding-bottom: 0;
  height: 50px;
  line-height: 50px;
  font-weight: bold;
}

.navbar-nav .nav-link {
  display: inline;
}
</style>
<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import LocaleSwitcher from './LocaleSwitcher.vue';
import ActiveSessionModal from './ActiveSessionModal.vue';

export default {
  components: { LocaleSwitcher, ActiveSessionModal },
  computed: {
    ...mapState('userAuthentication', ['status']),
    ...mapGetters('parliamentManagement', ['activeSession']),
  },
  methods: {
    ...mapActions('userAuthentication', ['logout']),
  },
};
</script>
