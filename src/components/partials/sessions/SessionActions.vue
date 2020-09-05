<template>
  <div>
    <div>
      <v-btn
        color="primary"
        class="mr-2"
        v-if="status === 'BEFORE_VOTING' || status === 'IN_PREPARATION'"
        @click="getPasswordsList"
      >
        <v-icon left>mdi-file</v-icon>
        {{ $t('sessionActions.generatePasswords') }}
      </v-btn>
      <v-btn
        color="success"
        @click="startSession(session.id)"
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
      <v-btn color="error" @click="finishSession(session.id)">
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
  methods: {
    ...mapActions('parliamentManagement', [
      'finishSession',
      'suspendSession',
      'startSession',
      'resumeSession',
    ]),
    ...mapActions('parliamentPreparation', ['getPasswordsList']),
  },
  computed: {
    status() {
      return this.session.status;
    },
  },
};
</script>
