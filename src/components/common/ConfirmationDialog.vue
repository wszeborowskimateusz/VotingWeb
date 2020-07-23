<template>
  <v-dialog v-model="isShown" max-width="500" persistent @click:outside="closeDialog">
    <v-card>
      <v-card-title class="headline">{{ text }}</v-card-title>
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

<script>
export default {
  data() {
    return {
      isShown: this.value,
    };
  },
  props: {
    value: {
      type: Boolean,
      required: true,
    },
    text: {
      type: String,
      default: () => this.$t('common.areYouSure'),
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
