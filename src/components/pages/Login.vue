<template>
  <div class="col-sm-6 offset-sm-3 pt-4">
    <h2>{{ $t('login.login') }}</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="username"> {{ $t('login.username') }}</label>
        <input
          type="text"
          v-model="username"
          name="username"
          class="form-control"
          :class="{ 'is-invalid': submitted && !username }"
        />
        <div v-show="submitted && !username" class="invalid-feedback">
          {{ $t('login.usernameRequired') }}
        </div>
      </div>
      <div class="form-group">
        <label for="password">{{ $t('login.password') }}</label>
        <input
          type="password"
          v-model="password"
          name="password"
          class="form-control"
          :class="{ 'is-invalid': submitted && !password }"
        />
        <div v-show="submitted && !password" class="invalid-feedback">
          {{ $t('login.passwordRequired') }}
        </div>
      </div>
      <div class="form-group">
        <button class="btn btn-secondary">{{ $t('login.login') }}</button>
      </div>
    </form>
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
      username: '',
      password: '',
      submitted: false,
    };
  },
  computed: {
    ...mapState('userAuthentication', ['status']),
  },
  methods: {
    ...mapActions('userAuthentication', ['login', 'logout']),
    handleSubmit() {
      this.submitted = true;
      const { username, password } = this;
      if (username && password) {
        this.login({ username, password });
      }
    },
  },
};
</script>
