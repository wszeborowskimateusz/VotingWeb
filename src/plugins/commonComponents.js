import Vue from 'vue';
import CommonModal from '@/components/common/CommonModal.vue';
import Loader from '@/components/common/Loader.vue';
import Tooltip from '@/components/common/Tooltip.vue';
import ConfirmationDialog from '@/components/common/ConfirmationDialog.vue';
import PasswordDialog from '@/components/common/PasswordDialog.vue';

export default {
  register() {
    Vue.component('CommonModal', CommonModal);
    Vue.component('Loader', Loader);
    Vue.component('Tooltip', Tooltip);
    Vue.component('ConfirmationDialog', ConfirmationDialog);
    Vue.component('PasswordDialog', PasswordDialog);
  },
};
