<template>
  <div class="ml-md-auto mr-2 my-4 my-md-0 mx-auto mx-md-2">
    <div v-if="status === 'IN_PREPARTION'">
      <v-btn color="success" class="mr-2">
        <v-icon left>mdi-play</v-icon>
        {{ $t('sessionActions.start') }}
      </v-btn>
    </div>
    <div v-if="status === 'BEFORE_VOTING'"></div>
    <div v-if="status === 'IN_PROGRESS'">
      <v-btn color="warning" class="mr-2">
        <v-icon left>mdi-pause</v-icon>
        {{ $t('sessionActions.suspend') }}
      </v-btn>
      <v-btn color="error">
        <v-icon left>mdi-stop</v-icon>
        {{ $t('sessionActions.finish') }}
      </v-btn>
    </div>
    <div v-if="status === 'SUSPENDED'">
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
  </div>
</template>

<script>
export default {
  props: {
    status: {
      type: String,
      required: true,
    },
  },
};
</script>
