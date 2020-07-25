<template>
  <v-app class="main-app">
    <div id="app">
      <Nav
        :style="{
          'background-color': $vuetify.theme.isDark ? '#121212' : 'white',
        }"
      />
      <div class="container__row">
        <div class="p-5">
          <router-view :key="$route.path"></router-view>
        </div>
      </div>
    </div>
  </v-app>
</template>

<style>
html {
  margin: 0;
  padding: 0;
  overflow-x: initial !important;
}

body {
  margin: 0;
  padding: 0;
  overflow-x: initial !important;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin: 0;
  padding: 0;
  height: 100vh;
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
}

.modal-open {
  overflow: inherit;
}
</style>

<script>
import { mapActions } from 'vuex';
import Nav from './components/partials/Nav.vue';

export default {
  components: { Nav },
  methods: {
    ...mapActions('parliamentManagement', ['loadSessions']),
  },
  mounted() {
    this.loadSessions();
  },
};
</script>
