<template>
  <common-modal :name="name">
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
          class="d-flex flex-row justify-content-center"
          :class="{'p-2': session[field] != null}"
        >
          <span class="font-weight-bold mr-2" v-if="session[field] != null"
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
          <span v-else-if="session[field] != null">{{ session[field] }}</span>
        </div>
      </div>
    </div>
  </common-modal>
</template>

<script>
import moment from 'moment';
import SessionStatusInfo from './SessionStatusInfo.vue';

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
  },
};
</script>