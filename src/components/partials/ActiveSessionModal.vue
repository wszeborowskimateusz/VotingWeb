<template>
  <modal name="activeSessionModal" height="auto">
    <a @click="close()" class="close-button">
      <i class="fas fa-times"></i>
    </a>
    <div>
      <h4 class="p-3">
        {{ $t('parliamentManagement.activeSession') }}
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
            getFormatedDate(activeSession[field])
          }}</span>
          <span v-else>{{ activeSession[field] }}</span>
        </div>
      </div>
    </div>
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
import { mapGetters } from 'vuex';
import moment from 'moment';

export default {
  data() {
    return {
      fieldsToDisplay: ['name', 'date', 'place', 'electionLead', 'status'],
    };
  },
  computed: {
    ...mapGetters('parliamentManagement', ['activeSession']),
  },
  methods: {
    close() {
      this.$modal.hide('activeSessionModal');
    },
    getFormatedDate(date) {
      return moment(date).format('DD.MM.YYYY');
    },
  },
};
</script>
