<template>
  <div class="locale-switcher">
    <select v-model="$i18n.locale">
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
};
</script>
