import config from '@/../config';

export default {
  getSupportedLocales() {
    const annotatedLocales = [];
    console.log('Siemanko');
    Object.keys(config.supportedLocales).forEach((code) => {
      annotatedLocales.push({
        code,
        name: config.supportedLocales[code],
      });
    });
    return annotatedLocales;
  },
  getBrowserLocale(options = {}) {
    const defaultOptions = { countryCodeOnly: false };
    const opt = { ...defaultOptions, ...options };
    const navigatorLocale =
      navigator.languages !== undefined
        ? navigator.languages[0]
        : navigator.language;
    if (!navigatorLocale) {
      return undefined;
    }
    const trimmedLocale = opt.countryCodeOnly
      ? navigatorLocale.trim().split(/-|_/)[0]
      : navigatorLocale.trim();
    return trimmedLocale;
  },
  supportedLocalesInclude(locale) {
    return Object.keys(config.supportedLocales).includes(locale);
  },
};
