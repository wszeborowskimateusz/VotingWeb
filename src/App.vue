<template>
  <div id="app">
    <Nav />
    <div class="container__row pt-2">
      <router-view :key="$route.path"></router-view>
    </div>
  </div>
</template>

<style>
html {
  height: 100%;
  margin: 0;
  padding: 0;
}

body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  padding: 0;
}

.container__row {
  height: 100%;
  overflow: auto;
}

.container {
  min-height: 100%;
}
</style>

<script>
import Nav from './components/partials/Nav.vue';

export default {
  components: { Nav },
};
</script>
