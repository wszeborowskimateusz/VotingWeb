<template>
  <common-modal
    name="newSessionModal"
    @before-close="beforeClose()"
    @before-open="beforeOpen"
  >
    <div class="col-sm-6 offset-sm-3 py-5 h-100">
      <h2 class="mb-4">{{ $t('parliamentManagement.createNewSession') }}</h2>
      <v-form ref="form" v-model="valid">
        <v-text-field
          v-model="session.name"
          :rules="[(v) => !!v || $t('parliamentManagement.nameRequired')]"
          :label="$t('parliamentManagement.name')"
          required
        ></v-text-field>

        <v-text-field
          v-model="session.place"
          :rules="[(v) => !!v || $t('parliamentManagement.placeRequired')]"
          :label="$t('parliamentManagement.place')"
          required
        ></v-text-field>

        <tooltip
          modalName="userFileTooltip"
          class=" d-flex justify-content-start mt-2"
        >
          <span v-html="$t('parliamentManagement.userFileTooltip')" />
        </tooltip>
        <v-file-input
          class="mb-2"
          :rules="[(v) => !!v || $t('parliamentManagement.userFileRequired')]"
          @change="onFileInputChange"
          :label="$t('parliamentManagement.userFile')"
        ></v-file-input>

        <v-date-picker
          v-model="session.date"
          type="date"
          :first-day-of-week="1"
          :locale="$i18n.locale"
          :allowed-dates="allowedDays"
          required
        ></v-date-picker>

        <div>
          <v-btn color="primary" class="my-5" large @click="handleSubmit">
            <v-icon left>mdi-plus</v-icon>
            {{ $t('common.create') }}
          </v-btn>
        </div>
        <v-overlay :value="isLoading">
          <v-progress-circular indeterminate size="64"></v-progress-circular>
        </v-overlay>
      </v-form>
    </div>
  </common-modal>
</template>
<script>
import { mapActions, mapState } from 'vuex';

export default {
  data() {
    return {
      valid: null,
      session: {
        name: '',
        date: new Date().toISOString().substr(0, 10),
        place: '',
      },
      userFile: null,
    };
  },
  computed: {
    ...mapState('parliamentPreparation', ['isLoading']),
  },
  methods: {
    ...mapActions('parliamentPreparation', ['setParliamentDetails']),
    handleSubmit() {
      this.$refs.form.validate();
      if (this.valid) {
        this.setParliamentDetails({
          userFile: this.userFile,
          session: this.session,
        }).then(() => {
          this.$modal.hide('newSessionModal');
        });
      }
    },
    beforeClose() {
      this.$refs.form.reset();
    },
    beforeOpen() {
      this.session.date = new Date().toISOString().substr(0, 10);
    },
    onFileInputChange(file) {
      this.userFile = file;
    },
    allowedDays(day) {
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);

      const date = new Date(day);

      return date >= yesterday;
    },
  },
};
</script>
