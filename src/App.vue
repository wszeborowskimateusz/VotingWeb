<template>
  <div id="app">
    <Nav />
     <div class="row container__row p-2">
        <router-view :key="$route.path"></router-view>
      </div>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.container__row {
  height: 100%;
  overflow: auto;
}
</style>

<script>
import Nav from './components/partials/Nav.vue';

export default {
  components: { Nav },
};
</script>
