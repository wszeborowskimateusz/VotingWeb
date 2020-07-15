<template>
  <common-modal :name="name" height="auto" width="65%">
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
            <SessionStatusInfo
              :status="session.status"
              :modalName="`sessionInfoModal${session.id}`"
            />
          </span>
          <span v-else>{{ session[field] }}</span>
        </div>
      </div>
    </div>
  </common-modal>
</template>

<script>
import moment from 'moment';
import SessionStatusInfo from './SessionStatusInfo.vue';
import CommonModal from './CommonModal.vue';

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
    getFormatedDate(date) {
      return moment(date).format('DD.MM.YYYY');
    },
  },
  components: {
    SessionStatusInfo,
    CommonModal,
  },
};
</script>
