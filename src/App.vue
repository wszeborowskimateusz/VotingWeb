<template>
  <v-app id="app">
    <Nav
      :style="{
        'background-color': $vuetify.theme.isDark ? '#333333' : 'white',
      }"
    />

    <v-main>
      <v-container fluid>
        <router-view class="px-5" :key="$route.path"></router-view>
      </v-container>
    </v-main>
    <v-overlay :value="isActionPerforming">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </v-app>
</template>

<style>
html {
  margin: 0;
  padding: 0;
}

body {
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>

<script>
import { mapActions, mapState } from 'vuex';
import Nav from './components/partials/Nav.vue';

export default {
  components: { Nav },
  methods: {
    ...mapActions('parliamentManagement', ['loadSessions']),
  },
  computed: {
    ...mapState('parliamentManagement', ['isActionPerforming']),
  },
  mounted() {
    this.loadSessions();
  },
};
</script>
