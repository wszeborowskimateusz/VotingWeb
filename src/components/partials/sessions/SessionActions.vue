<template>
  <div>
    <div>
      <v-btn
        color="primary"
        class="mr-2"
        v-if="status === 'BEFORE_VOTING' || status === 'IN_PREPARATION'"
        @click="onDownloadPasswords"
      >
        <v-icon left>mdi-file</v-icon>
        {{ $t('sessionActions.generatePasswords') }}
      </v-btn>
      <v-btn
        color="success"
        @click="readySession(session.id)"
        v-if="status === 'IN_PREPARATION'"
      >
        <v-icon left>mdi-play</v-icon>
        {{ $t('sessionActions.start') }}
      </v-btn>
    </div>

    <div v-if="status === 'IN_PROGRESS'">
      <v-btn color="warning" class="mr-2" @click="suspendSession(session.id)">
        <v-icon left>mdi-pause</v-icon>
        {{ $t('sessionActions.suspend') }}
      </v-btn>
      <v-btn color="error" @click="isConfirmSessionFinishDialogShown = true">
        <v-icon left>mdi-stop</v-icon>
        {{ $t('sessionActions.finish') }}
      </v-btn>
    </div>
    <div v-if="status === 'SUSPENDED'" @click="resumeSession(session.id)">
      <v-btn>
        <v-icon left>mdi-play</v-icon>
        {{ $t('sessionActions.resume') }}
      </v-btn>
    </div>
    <div v-if="status === 'FINISHED'"></div>
    <div v-if="status === 'FINISHED_NOT_SAVED_TO_GLOBAL'">
      <v-btn color="cyan" dark :title="$t('sessionActions.saveToGlobalTitle')">
        <v-icon left>mdi-content-save</v-icon>
        {{ $t('sessionActions.saveToGlobal') }}
      </v-btn>
    </div>
    <ConfirmationDialog
      :header="
        $t('sessionActions.areYouSureToFinish', { sessionName: session.name })
      "
      :description="$t('sessionActions.actionIsIrreversibleVotingWillBeFinished')"
      v-model="isConfirmSessionFinishDialogShown"
      @callback="finishSession(session.id)"
    />
    <PasswordDialog
      :header="$t('sessionActions.downloadPasswordFileRequiresPassword')"
      :disclaimer="
        $t('sessionActions.downloadPasswordFileRequiresPasswordDisclaimer')
      "
      v-model="isPasswordDialogShown"
      @callback="getPasswordsList({ sessionId: session.id, password: $event })"
    />
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  props: {
    session: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isConfirmSessionFinishDialogShown: false,
      isPasswordDialogShown: false,
    };
  },
  methods: {
    ...mapActions('parliamentManagement', [
      'finishSession',
      'suspendSession',
      'readySession',
      'resumeSession',
    ]),
    ...mapActions('parliamentPreparation', ['getPasswordsList']),
    onDownloadPasswords() {
      this.isPasswordDialogShown = true;
    },
  },
  computed: {
    status() {
      return this.session.status;
    },
  },
};
</script>
