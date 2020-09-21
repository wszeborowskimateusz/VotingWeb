<template>
  <div class="session__list">
    <div :style="{ visibility: isLoading ? 'visible' : 'hidden' }">
      <Loader />
    </div>
    <div>
      <h1 class="font-weight-bold pb-2">
        {{ $t('parliamentManagement.sessions') }}
      </h1>
      <v-btn
        color="primary"
        class="mb-3"
        :loading="isSelectingFile"
        @click="pickFile"
      >
        <v-icon left>mdi-upload</v-icon>
        {{ $t('parliamentManagement.uploadSession') }}
      </v-btn>
      <input
        ref="uploader"
        class="d-none"
        type="file"
        @change="onFileChanged"
      />
      <div :title="$t('parliamentManagement.thisSessionIsActive')">
        <v-btn fab color="purple" height="40" width="40"></v-btn>
        {{ $t('parliamentManagement.thisSessionIsActive') }}
        <tooltip modalName="changeActiveSessionIconTooltip">
          {{ $t('parliamentManagement.activeSessionDescription') }}
        </tooltip>
      </div>
      <div :title="$t('parliamentManagement.changeToActiveSession')">
        <v-btn fab outlined color="purple" height="40" width="40"></v-btn>
        {{ $t('parliamentManagement.changeToActiveSession') }}
      </div>
      <SessionListElement
        v-for="session in sessions"
        :key="session.id"
        :session="session"
      />
      <div
        v-if="!isLoading && (sessions == null || sessions.length === 0)"
        class="h3 mt-5 pre-formatted"
      >
        {{ $t('parliamentManagement.noSessionsDisclaimer') }}
      </div>
    </div>
    <EditSessionModal />
    <PasswordDialog
      :header="$t('sessionActions.uploadRequiresPassword')"
      :disclaimer="$t('sessionActions.uploadRequiresPasswordDisclaimer')"
      v-model="isUploadPasswordDialogShown"
      @callback="uploadSession({ sessionFile: selectedFile, password: $event })"
    />
  </div>
</template>
<style scoped>
.session__list {
  padding-bottom: 10vh;
}

.pre-formatted {
  white-space: pre;
}
</style>
<script>
import { mapActions, mapState } from 'vuex';
import SessionListElement from '../partials/sessions/SessionListElement.vue';
import EditSessionModal from '../partials/sessions/EditSessionModal.vue';
import imageGetter from '../../utils/imagesGetter';

export default {
  components: {
    SessionListElement,
    EditSessionModal,
  },
  data() {
    return {
      imageGetter,
      selectedFile: null,
      isSelectingFile: false,
      isUploadPasswordDialogShown: false,
    };
  },
  mounted() {
    this.loadMembers();
  },
  computed: {
    ...mapState('parliamentManagement', ['isLoading', 'sessions']),
  },
  methods: {
    ...mapActions('membersManagement', ['loadMembers']),
    ...mapActions('parliamentManagement', ['uploadSession']),
    pickFile() {
      this.isSelectingFile = true;
      window.addEventListener(
        'focus',
        () => {
          this.isSelectingFile = false;
        },
        { once: true },
      );

      this.$refs.uploader.click();
    },
    onFileChanged(event) {
      [this.selectedFile] = event.target.files;
      this.isUploadPasswordDialogShown = true;
    },
  },
};
</script>
