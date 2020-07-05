import Toasted from 'vue-toasted';
import Vue from 'vue';

Vue.use(Toasted);

export default {
  errorToast(message) {
    Vue.toasted.error(message, {
      action: {
        text: 'Anuluj',
        onClick: (e, toastObject) => {
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
        text: 'Anuluj',
        onClick: (e, toastObject) => {
          toastObject.goAway(0);
        },
      },
      position: 'bottom-center',
      fitToScreen: true,
      duration: 5000,
    });
  },
};
