<template>
  <div class="row my-5">
    <div
      class="col-8 offset-2 rounded p-3 shadow main__container"
      :class="[session.isActive ? ['border-success', 'border'] : '']"
    >
      <div class="action__buttons__section action__button">
        <v-btn
          icon
          v-if="session.status !== 'FINISHED'"
          @click="editSession(session.id)"
          :title="$t('common.edit')"
        >
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn
          icon
          v-if="session.status === 'FINISHED'"
          @click="removeSession(session.id)"
          :title="$t('common.remove')"
        >
          <v-icon>mdi-delete</v-icon>
        </v-btn>
        <v-btn
          icon
          @click="downloadSession(session.id)"
          :title="$t('common.download')"
        >
          <v-icon>mdi-download</v-icon>
        </v-btn>

        <div
          class="active_session_badge d-inline"
          v-if="session.isActive"
          :title="$t('parliamentManagement.thisSessionIsActive')"
        >
          <v-btn fab color="purple" height="40" width="40"></v-btn>
        </div>
        <div
          class="active_session_badge d-inline"
          v-else
          @click="changeActiveSession(session.id)"
          :title="$t('parliamentManagement.changeToActiveSession')"
        >
        <v-btn fab outlined color="purple" height="40" width="40"></v-btn>
        </div>
      </div>
      <div class="row">
        <div class="col-12 col-md-6 text-left">
          <h4>{{ session.name }}</h4>
          <h6>{{ getFormatedDate(session.date) }}</h6>
          <SessionStatusInfo
            class="mb-2"
            :status="session.status"
            :modalName="`listElement${session.id}`"
          />
          <a
            @click="$modal.show(sessionModalName)"
            class="d-block text-primary cursor_pointer"
            >{{ $t('common.more') }}</a
          >
        </div>
        <SessionActions :status="session.status" class="pb-4" />
      </div>
    </div>
    <SessionInfoModal :name="sessionModalName" :session="session" />
  </div>
</template>
<style scoped>
.action__buttons__section {
  position: absolute;
  bottom: 5px;
  right: 5px;
}

.action__button {
  font-size: 1.3em;
  cursor: pointer;
}

.cursor_pointer {
  cursor: pointer;
}
</style>
<script>
import moment from 'moment';
import { mapActions } from 'vuex';
import imageGetter from '../../utils/imagesGetter';
import SessionInfoModal from './SessionInfoModal.vue';
import SessionStatusInfo from './SessionStatusInfo.vue';
import SessionActions from './SessionActions.vue';
import bootbox from '../../utils/bootbox';
import i18n from '../../i18n';

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
    ...mapActions('parliamentManagement', ['changeActiveSession']),
    getFormatedDate(date) {
      return moment(date).format('DD.MM.YYYY');
    },
    openInfoModal() {
      this.$modal.show('activeSessionModal');
    },
    downloadSession(sessionId) {
      console.log(`Downloading the session with id: ${sessionId}`);
    },
    editSession(sessionId) {
      console.log(`Editing the session with id: ${sessionId}`);
    },
    removeSession(sessionId) {
      bootbox.confirmationDialog(
        i18n.t('sessionActions.areYouSureToRemove', {
          sessionName: this.session.name,
        }),
        () => {
          console.log(`Session with id ${sessionId} was removed`);
        },
      );
    },
  },
  components: {
    SessionInfoModal,
    SessionStatusInfo,
    SessionActions,
  },
};
</script>
