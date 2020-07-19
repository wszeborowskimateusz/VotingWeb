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
          <button
            class="btn btn-primary mr-3"
            @click="$modal.show('newSessionModal')"
          >
            <i class="fas fa-plus-square"></i>
            {{ $t('parliamentManagement.newSession') }}
          </button>
        </li>
        <li class="nav-item align-items-center">
          <router-link to="/" class="nav-link">
            {{ $t('common.mainPage') }}
          </router-link>
        </li>
        <li class="divider-vertical"></li>
        <li class="nav-item align-items-center">
          <router-link to="/sessions" class="nav-link">
            {{ $t('parliamentManagement.sessions') }}
          </router-link>
        </li>
      </ul>
      <!--Keep the layout consistent-->
      <div v-else class="flex-fill"></div>
      <ul class="nav navbar-nav">
        <li v-if="activeSession" class="nav-item mr-4">
          <p @click="$modal.show('activeSessionModal')">
            {{ $t('parliamentManagement.activeSession') }}:
            {{ activeSession.name }}
          </p>
        </li>
        <li v-else-if="isLoading" class="nav-item mr-4">
          <Loader :isMainPageLoader="false" />
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
      <ActiveSessionModal
        v-if="activeSession"
        name="activeSessionModal"
        :session="activeSession"
      />
      <NewSessionModal />
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
  cursor: pointer;
}

.navbar-nav .nav-link {
  display: inline;
}

.navbar .divider-vertical {
  height: 40px;
  margin: 0 9px;
  border-right: 1px solid #847d88;
}

.nav-item {
  white-space: nowrap;
}

@media (max-width: 1200px) {
  .navbar .divider-vertical {
    display: none;
  }
}
</style>
<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import $ from 'jquery';
import LocaleSwitcher from './LocaleSwitcher.vue';
import ActiveSessionModal from './SessionInfoModal.vue';
import NewSessionModal from '../pages/NewSessionModal.vue';

export default {
  components: {
    LocaleSwitcher,
    ActiveSessionModal,
    NewSessionModal,
  },
  computed: {
    ...mapState('userAuthentication', ['status']),
    ...mapState('parliamentManagement', ['isLoading']),
    ...mapGetters('parliamentManagement', ['activeSession']),
  },
  methods: {
    ...mapActions('userAuthentication', ['logout']),
  },
  mounted() {
    $('.navbar-nav>li>a').on('click', () => {
      $('.navbar-collapse').collapse('hide');
    });
  },
};
</script>
