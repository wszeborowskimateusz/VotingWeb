<template>
  <v-dialog
    v-model="value"
    max-width="500"
    persistent
    @click:outside="closeDialog"
  >
    <v-card>
      <v-card-title class="headline">
        <v-avatar color="error" class="mx-auto mb-3">
          <v-icon large>
            mdi-exclamation
          </v-icon>
        </v-avatar>
        {{ header }}</v-card-title
      >
      <v-card-text>{{ description }}</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="closeDialog">
          {{ $t('common.cancel') }}
        </v-btn>
        <v-btn @click="success">
          {{ $t('common.confirm') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.v-card__text,
.v-card__title {
  word-break: normal;
}
</style>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      required: true,
    },
    header: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: () => '',
    },
  },
  methods: {
    success() {
      this.$emit('callback');
      this.closeDialog();
    },
    closeDialog() {
      this.$emit('input', false);
    },
  },
};
</script>
