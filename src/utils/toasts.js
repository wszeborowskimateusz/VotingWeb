import Toasted from 'vue-toasted';
import Vue from 'vue';
import i18n from '../i18n';

Vue.use(Toasted);

export default {
  errorToast(message) {
    Vue.toasted.error(message, {
      action: {
        text: i18n.tc('common.ok'),
        onClick: (_, toastObject) => {
          toastObject.goAway(0);
        },
      },
      position: 'bottom-center',
      fitToScreen: true,
      duration: 5000,
    });
  },
  successToast(message) {
    Vue.toasted.success(message, {
      action: {
        text: i18n.tc('common.ok'),
        onClick: (_, toastObject) => {
          toastObject.goAway(0);
        },
      },
      position: 'bottom-center',
      fitToScreen: true,
      duration: 5000,
    });
  },
};
