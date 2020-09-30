<template>
  <div class="col-sm-6 offset-sm-3 pt-4">
    <v-card class="p-2 pt-5">
      <h2>{{ $t('login.login') }}</h2>
      <v-form ref="form" class="p-5" v-model="valid" @submit.prevent="handleSubmit">
        <v-text-field
          v-model="username"
          :rules="[(v) => !!v || $t('login.usernameRequired')]"
          :label="$t('login.username')"
          required
          prepend-icon="mdi-account"
        ></v-text-field>

        <v-text-field
          v-model="password"
          :rules="[(v) => !!v || $t('login.passwordRequired')]"
          :label="$t('login.password')"
          required
          type="password"
          prepend-icon="mdi-lock"
        ></v-text-field>

        <v-btn class="mt-5" type="submit" dark>{{
          $t('login.login')
        }}</v-btn>
      </v-form>
    </v-card>
    <div
      v-if="status.loginInProgress"
      class="d-flex p-2 justify-content-center"
    >
      <Loader class="m-2"></Loader>
    </div>
  </div>
</template>

<style scoped>
.vertical-center {
  min-height: 100%; /* Fallback for browsers do NOT support vh unit */
  min-height: 100vh; /* These two lines are counted as one :-)       */

  display: flex;
  align-items: center;
}
</style>

<script>
import { mapState, mapActions } from 'vuex';
import imagesGetter from '@/utils/imagesGetter';

export default {
  name: 'login',
  data() {
    return {
      imagesGetter,
      valid: null,
      username: '',
      password: '',
    };
  },
  computed: {
    ...mapState('userAuthentication', ['status']),
  },
  methods: {
    ...mapActions('userAuthentication', ['login', 'logout']),
    handleSubmit() {
      this.$refs.form.validate();
      if (this.valid) {
        const { username, password } = this;
        this.login({ username, password });
      }
    },
  },
};
</script>
