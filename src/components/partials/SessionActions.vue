<template>
  <div>
    <div v-if="status === 'IN_PREPARTION'">
      <v-btn color="success" class="mr-2" @click="startSession">
        <v-icon left>mdi-play</v-icon>
        {{ $t('sessionActions.start') }}
      </v-btn>
    </div>
    <div v-if="status === 'BEFORE_VOTING'"></div>
    <div v-if="status === 'IN_PROGRESS'">
      <v-btn color="warning" class="mr-2" @click="suspendSession">
        <v-icon left>mdi-pause</v-icon>
        {{ $t('sessionActions.suspend') }}
      </v-btn>
      <v-btn color="error" @click="finishSession">
        <v-icon left>mdi-stop</v-icon>
        {{ $t('sessionActions.finish') }}
      </v-btn>
    </div>
    <div v-if="status === 'SUSPENDED'" @click="resumeSession">
      <v-btn>
        <v-icon left>mdi-play</v-icon>
        {{ $t('sessionActions.resume') }}
      </v-btn>
    </div>
    <div v-if="status === 'FINISHED'"></div>
    <div v-if="status === 'FINISHED_NOT_SAVED_TO_GLOBAL'">
      <v-btn color="cyan" dark>
        <v-icon left>mdi-content-save</v-icon>
        {{ $t('sessionActions.saveToGlobal') }}
      </v-btn>
    </div>
    <v-overlay :value="isActionPerforming">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

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
      'downloadSession',
      'uploadSession',
    ]),
  },
  computed: {
    ...mapState('parliamentManagement', ['isActionPerforming']),
    status() {
      return this.session.status;
    },
  },
};
</script>
