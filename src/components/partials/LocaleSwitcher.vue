<template>
  <select v-model="lang" id="locale_switcher" class="custom-select">
    <option :value="locale.code" v-for="locale in locales" :key="locale.code">
      {{ locale.name }}
    </option>
  </select>
</template>

<style scoped>
#locale_switcher {
  width: auto;
}
</style>

<script>
import supportedLocales from '@/utils/localeUtils';

export default {
  data() {
    return {
      locales: supportedLocales.getSupportedLocales(),
    };
  },
  computed: {
    lang: {
      get() {
        return this.$store.state.localeStore.locale;
      },
      set(newVal) {
        this.$store.dispatch('localeStore/changeLocale', newVal);
      },
    },
  },
};
</script>
