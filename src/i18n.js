import Vue from 'vue';
import VueI18n from 'vue-i18n';
import localeUtils from '@/utils/localeUtils';

Vue.use(VueI18n);

function getStartingLocale() {
  const browserLocale = localeUtils.getBrowserLocale({ countryCodeOnly: true });
  if (localeUtils.supportedLocalesInclude(browserLocale)) {
    return browserLocale;
  }
  return process.env.VUE_APP_I18N_LOCALE || 'en';
}

function loadLocaleMessages() {
  const locales = require.context(
    './locales',
    true,
    /[A-Za-z0-9-_,\s]+\.json$/i,
  );
  const messages = {};
  locales.keys().forEach((key) => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i);
    if (matched && matched.length > 1) {
      const locale = matched[1];
      messages[locale] = locales(key);
    }
  });
  return messages;
}

export const selectedLocale = JSON.parse(localStorage.getItem('vuex'))?.localeStore?.locale ?? getStartingLocale();
export default new VueI18n({
  locale: selectedLocale,
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'en',
  messages: loadLocaleMessages(),
});
