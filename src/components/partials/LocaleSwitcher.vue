<template>
  <div>
    <select v-model="lang" class="form-control">
      <option :value="locale.code" v-for="locale in locales" :key="locale.code">
        {{ locale.name }}
      </option>
    </select>
  </div>
</template>

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
