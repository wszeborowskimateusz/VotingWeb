import Vue from 'vue';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';

import VModal from 'vue-js-modal';
import 'vuetify/dist/vuetify.min.css';
import i18n from './i18n';

import navigationObserver from './utils/navigationObserver';
import vuetify from './plugins/vuetify';
import commonComponents from './plugins/commonComponents';

require('bootstrap');

Vue.config.productionTip = false;

// Prevent accessing restricted pages if not logged in
router.beforeEach((to, from, next) => {
  navigationObserver.checkForWrongToken(store, to, from, next);
});

Vue.use(VModal);
commonComponents.register();


new Vue({
  router,
  store,
  i18n,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
