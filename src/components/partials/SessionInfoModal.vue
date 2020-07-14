<template>
  <modal :name="name" height="auto" width="65%">
    <a @click="close()" class="close-button">
      <i class="fas fa-times"></i>
    </a>
    <div>
      <h4 class="p-3">
        <span v-if="session.isActive">{{
          $t('parliamentManagement.activeSession')
        }}</span>
        <span v-else>{{ $t('parliamentManagement.sessionInfo') }}</span>
      </h4>
      <div class="d-flex flex-column mb-3">
        <div
          v-for="field in fieldsToDisplay"
          v-bind:key="field"
          class="d-flex flex-row justify-content-center p-2"
        >
          <span class="font-weight-bold mr-2"
            >{{ $t(`parliamentManagement.${field}`) }}:
          </span>
          <span v-if="field == 'date'">{{
            getFormatedDate(session[field])
          }}</span>
          <span v-else-if="field == 'status'">
            {{ $t(`sessionStatus.${session[field]}.name`) }}
            <a @click="$modal.show('sessionStatusInfoModal')">
              <i class="fas fa-info-circle"></i>
            </a>
          </span>
          <span v-else>{{ session[field] }}</span>
        </div>
      </div>
    </div>
    <SessionStatusInfoModal :status="session['status']" />
  </modal>
</template>
<style scoped>
.close-button {
  position: absolute;
  right: 10px;
  top: 5px;
}
</style>
<script>
import moment from 'moment';
import SessionStatusInfoModal from './SessionStatusInfoModal.vue';

export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    session: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      fieldsToDisplay: ['name', 'date', 'place', 'electionLead', 'status'],
    };
  },
  methods: {
    close() {
      this.$modal.hide(this.name);
    },
    getFormatedDate(date) {
      return moment(date).format('DD.MM.YYYY');
    },
  },
  components: {
    SessionStatusInfoModal,
  },
};
</script>
