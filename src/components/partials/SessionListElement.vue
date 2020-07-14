<template>
  <div class="row my-4">
    <div
      class="col-8 offset-2 rounded p-3 shadow main__container"
      :class="[session.isActive ? ['border-success', 'border'] : '']"
    >
      <div class="active_session_badge" v-if="session.isActive">
        <img :src="imageGetter.getImgUrl('tick.svg')" height="50" />
      </div>
      <div class="row">
        <div class="col-4 text-left">
          <h4>{{ session.name }}</h4>
          <h6>{{ getFormatedDate(session.date) }}</h6>
          <a @click="$modal.show(sessionModalName)" class="d-block text-primary">{{
            $t('common.more')
          }}</a>
        </div>
        <div class="d-flex flex-column">
          Action
        </div>
      </div>
    </div>
    <SessionInfoModal :name="sessionModalName" :session="session" />
  </div>
</template>
<style scoped>
.active_session_badge {
  position: absolute;
  right: -10px;
  top: -10px;
}
</style>
<script>
import moment from 'moment';
import imageGetter from '../../utils/imagesGetter';
import SessionInfoModal from './SessionInfoModal.vue';

export default {
  props: {
    session: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      imageGetter,
      sessionModalName: `session${this.session.id}`,
    };
  },
  methods: {
    getFormatedDate(date) {
      return moment(date).format('DD.MM.YYYY');
    },
    openInfoModal() {
      this.$modal.show('activeSessionModal');
    },
  },
  components: {
    SessionInfoModal,
  },
};
</script>
