<template>
  <div>
    <v-app-bar fixed app hide-on-scroll>
      <v-app-bar-nav-icon
        v-if="status.loggedIn"
        @click="drawer = true"
      ></v-app-bar-nav-icon>
      <v-btn
        v-if="status.loggedIn"
        color="primary"
        class="ml-3"
        @click="$modal.show('newSessionModal')"
      >
        <v-icon left>mdi-plus</v-icon>
        {{ $t('parliamentManagement.newSession') }}
      </v-btn>
      <v-spacer></v-spacer>

      <a v-if="activeSession && status.loggedIn" class="mr-4">
        <p
          @click="$modal.show('activeSessionModal')"
          style="margin-bottom: 0;"
          class="font-weight-bold"
        >
          {{ $t('parliamentManagement.activeSession') }}:
          {{ activeSession.name }}
        </p>
      </a>
      <div v-else-if="!activeSession && status.loggedIn" class="mr-5">
        {{$t('parliamentManagement.noActiveSession')}}
        <Tooltip modalName='no active session tooltip'>
          {{$t('parliamentManagement.noActiveSessionTooltip')}}
        </Tooltip>
      </div>
      <div v-else-if="isLoading" class="mr-4">
        <Loader :isMainPageLoader="false" />
      </div>
      <LocaleSwitcher />
      <v-menu bottom left class="nav-item">
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item>
            <v-switch
              v-model="$vuetify.theme.isDark"
              :label="$t('common.darkTheme')"
            />
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" temporary app>
      <v-list nav>
        <v-list-item-group>
          <v-list-item
            v-for="link in navigationLinks"
            :key="link.route"
            :to="link.route"
          >
            <v-list-item-icon>
              <v-icon>{{ link.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>
              {{ self[link.text] }}
            </v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <template v-slot:append>
        <v-btn
          v-if="status.loggedIn"
          outlined=""
          class="mb-5"
          @click="logout()"
        >
          <v-icon left>mdi-logout</v-icon>
          {{ $t('login.logout') }}
        </v-btn>
      </template>
    </v-navigation-drawer>
    <ActiveSessionModal
      v-if="activeSession"
      name="activeSessionModal"
      :session="activeSession"
    />

    <NewSessionModal />
  </div>
</template>
<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import LocaleSwitcher from './LocaleSwitcher.vue';
import ActiveSessionModal from './sessions/SessionInfoModal.vue';
import NewSessionModal from './sessions/NewSessionModal.vue';

export default {
  data() {
    return {
      drawer: false,
      group: 0,
      self: this,
      navigationLinks: [
        { icon: 'mdi-home', text: 'homePageTitle', route: '/' },
        {
          icon: 'mdi-account-multiple',
          text: 'userManagementTitle',
          route: '/user-management',
        },
        {
          icon: 'mdi-view-list',
          text: 'sessionsTitle',
          route: '/sessions',
        },
      ],
    };
  },
  components: {
    LocaleSwitcher,
    ActiveSessionModal,
    NewSessionModal,
  },
  computed: {
    ...mapState('userAuthentication', ['status']),
    ...mapState('parliamentManagement', ['isLoading']),
    ...mapGetters('parliamentManagement', ['activeSession']),
    homePageTitle() {
      return this.$t('common.mainPage');
    },
    userManagementTitle() {
      return this.$t('userManagement.users');
    },
    sessionsTitle() {
      return this.$t('parliamentManagement.sessions');
    },
  },
  methods: {
    ...mapActions('userAuthentication', ['logout']),
  },
};
</script>
