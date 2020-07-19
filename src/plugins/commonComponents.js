import Vue from 'vue';
import CommonModal from '@/components/common/CommonModal.vue';
import Loader from '@/components/common/Loader.vue';
import Tooltip from '@/components/common/Tooltip.vue';

export default {
  register() {
    Vue.component('CommonModal', CommonModal);
    Vue.component('Loader', Loader);
    Vue.component('Tooltip', Tooltip);
  },
};
