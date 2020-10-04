<template>
  <v-dialog
    v-model="value"
    max-width="500"
    persistent
    @click:outside="closeDialog"
  >
    <v-card>
      <v-card-title class="headline">
        <v-avatar class="mx-auto mb-3">
          <v-icon large>
            mdi-lock
          </v-icon>
        </v-avatar>
        {{ header }}</v-card-title
      >
      <v-card-text>
        {{ disclaimer }}
        <v-form ref="form" class="p-5" v-model="valid" @submit.prevent="success">
          <v-text-field
            :label="$t('login.password')"
            :type="isPasswordVisible ? 'text' : 'password'"
            v-model="password"
            required
            :rules="[(v) => !!v || $t('login.passwordRequired')]"
            :append-icon="isPasswordVisible ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="isPasswordVisible = !isPasswordVisible"
          ></v-text-field></v-form
      ></v-card-text>
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
    disclaimer: {
      type: String,
      default: () => '',
    },
  },
  data() {
    return {
      isPasswordVisible: false,
      password: '',
      valid: null,
    };
  },
  methods: {
    success() {
      this.$refs.form.validate();
      if (this.valid) {
        this.$emit('callback', this.password);
        this.closeDialog();
      }
    },
    closeDialog() {
      this.password = '';
      this.valid = null;
      this.isPasswordVisible = false;
      this.$emit('cancel');
      this.$emit('input', false);
    },
  },
};
</script>
