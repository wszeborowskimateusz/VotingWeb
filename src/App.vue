<template>
  <div id="app">
    <Nav id="navigation" />
    <div class="container__row container pt-2">
      <router-view :key="$route.path"></router-view>
    </div>
  </div>
</template>

<style>
html {
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

#navigation {
  background-color: white;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  padding: 0;
  height: 100%;
}

.container__row {
  height: 100%;
  overflow: auto;
}

.container {
  min-height: 100%;
}

.modal-open {
  overflow: inherit;
}

::-webkit-scrollbar {
  width: 0px;
  background: transparent; /* make scrollbar transparent */
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
