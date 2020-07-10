<template>
  <div class="locale-switcher">
    <select v-model="lang" class="form-control">
      <option :value="locale.code" v-for="locale in locales" :key="locale.code">
        {{ locale.name }}
      </option>
    </select>
  </div>
</template>

<style scoped></style>

<script>
import supportedLocales from '@/utils/localeUtils';

export default {
  data() {
    return {
      locales: supportedLocales.getSupportedLocales(),
    };
  },
  created() {
    console.log(this.$store.state.localeStore.locale);
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
