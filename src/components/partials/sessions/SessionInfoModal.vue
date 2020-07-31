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
          :class="{ 'p-2': session[field] != null }"
        >
          <span class="font-weight-bold mr-2" v-if="session[field] != null"
            >{{ $t(`parliamentManagement.${field}`) }}:
          </span>
          <span v-if="field === 'date'">{{
            getFormatedDate(session[field])
          }}</span>
          <span v-else-if="field === 'status'">
            <SessionStatusInfo
              :status="session.status"
              :modalName="`sessionInfoModal${session.id}`"
            />
          </span>
          <span v-else-if="field === 'electionLead' && session[field] != null">
            {{ electionLeadName }}
          </span>
          <span v-else-if="session[field] != null">{{ session[field] }}</span>
        </div>
      </div>
    </div>
  </common-modal>
</template>

<script>
import moment from 'moment';
import { mapActions, mapState, mapGetters } from 'vuex';
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
  computed: {
    ...mapState('membersManagement', ['members']),
    ...mapGetters('membersManagement', ['electionLeadById']),
    electionLeadName() {
      const lead = this.electionLeadById(this.session.id);
      if (lead == null) {
        return '';
      }

      return lead.fullName;
    },
  },
  methods: {
    ...mapActions('membersManagement', ['loadMembers']),
    getFormatedDate(date) {
      return moment(date).format('DD.MM.YYYY');
    },
  },
  mounted() {
    this.loadMembers({
      sessionIdToLoad: this.session.id,
      takeStateFromCache: true,
    });
  },
  components: {
    SessionStatusInfo,
  },
};
</script>
