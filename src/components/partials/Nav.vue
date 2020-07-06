<template>
  <nav class="nav">
    <div class="nav__start">
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
    </div>
    <div class="nav__end">
      <LocaleSwitcher />
    </div>
  </nav>
</template>

<style scoped>
.nav {
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  color: #fff;
  background-color: #3d536a;
}

.nav a {
  margin-right: 1.5rem;
  font-weight: bold;
  color: #fff;
  text-decoration: none;
}
</style>
<script>
import LocaleSwitcher from './LocaleSwitcher.vue';

export default {
  components: { LocaleSwitcher },
};
</script>
