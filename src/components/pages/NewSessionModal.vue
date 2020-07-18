<template>
  <common-modal
    name="newSessionModal"
    height="80%"
    @before-close="beforeClose()"
  >
    <div class="col-sm-6 offset-sm-3 py-5 h-100">
      <h2 class="mb-4">{{ $t('parliamentManagement.createNewSession') }}</h2>
      <form @submit.prevent="handleSubmit">
        <div class="form-group" v-for="field in fieldsToDisplay" :key="field">
          <label :for="field"> {{ $t(`parliamentManagement.${field}`) }}</label>
          <tooltip v-if="field === 'userFile'" class="ml-2" modalName="userFileTooltip">
              {{$t('parliamentManagement.userFileTooltip')}}
          </tooltip>
          <datepicker
            v-if="field === 'date'"
            v-model="session.date"
            :bootstrap-styling="true"
            :required="true"
            :clear-button="true"
            :language="locale"
            :disabled-dates="disabledDays"
            :monday-first="true"
          />

          <div class="custom-file" v-else-if="field === 'userFile'">
            <input
              type="file"
              lang="pl"
              class="custom-file-input"
              v-on:change="onFileInputChange"
              :name="field"
              :class="{ 'is-invalid': submitted && !session[field] }"
            />
            <label class="custom-file-label text-left">{{ fileLabel }}</label>
          </div>

          <input
            v-else
            type="text"
            v-model="session[field]"
            :name="field"
            class="form-control"
            :class="{ 'is-invalid': submitted && !session[field] }"
          />
          <div
            v-show="submitted && !session[field]"
            class="invalid-feedback"
            :class="{ display: field === 'date' || field === 'userFile' }"
          >
            {{ $t(`parliamentManagement.${field}Required`) }}
          </div>
        </div>

        <div class="form-group ">
          <button class="btn btn-primary bottom">
            <i class="fas fa-plus-square mr-1"></i>{{ $t('common.create') }}
          </button>
        </div>
      </form>
    </div>
  </common-modal>
</template>
<style scoped>
.display {
  display: block;
}

.bottom {
  height: 60px;
  width: 200px;
  position: absolute;
  bottom: 20px;
  left: 50%;
  margin-left: -100px;
}
.custom-file-label::after {
  content: var(--fileLabel);
}
</style>
<script>
import Datepicker from 'vuejs-datepicker';
import { en, pl } from 'vuejs-datepicker/dist/locale';
import CommonModal from '../partials/CommonModal.vue';
import Tooltip from '../partials/Tooltip.vue';

export default {
  components: { CommonModal, Datepicker, Tooltip },
  data() {
    return {
      submitted: false,
      session: {
        name: '',
        date: null,
        place: '',
        userFile: null,
      },
      fieldsToDisplay: ['name', 'date', 'place', 'userFile'],
      datePickerTranslations: {
        en,
        pl,
      },
    };
  },
  computed: {
    locale() {
      return this.datePickerTranslations[this.$i18n.locale];
    },
    fileLabel() {
      return this.session.userFile == null
        ? this.$t('parliamentManagement.chooseAFile')
        : this.session.userFile.name;
    },
    disabledDays() {
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);

      return {
        to: yesterday,
      };
    },
  },
  methods: {
    handleSubmit() {
      this.submitted = true;
    },
    beforeClose() {
      this.submitted = false;
    },
    onFileInputChange(e) {
      const files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      [this.session.userFile] = files;
    },
  },
};
</script>
