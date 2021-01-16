<template>
  <common-modal
    name="editSessionModal"
    @before-close="beforeClose"
    @before-open="beforeOpen"
  >
    <div class="col-sm-6 offset-sm-3 py-5 h-100">
      <h2 class="mb-4">{{ $t('parliamentManagement.editSession') }}</h2>
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

        <v-date-picker
          v-model="session.date"
          type="date"
          :first-day-of-week="1"
          :locale="$i18n.locale"
          required
        ></v-date-picker>

        <v-autocomplete
          v-if="session.status !== 'IN_PREPARATION'"
          v-model="session.electionCommittee"
          :items="membersList"
          multiple
          chips
          deletable-chips
          :search-input.sync="committeeSearchInput"
          @change="committeeSearchInput = ''"
          :rules="[
            (v) =>
              (!!v &&
                (v.length === 0 ||
                  v.length >= minimalNumberOfPeopleInCommittee)) ||
              $t('session.committeeAtLeastMembers', {
                amount: minimalNumberOfPeopleInCommittee,
              }),
          ]"
          :label="$t('session.committeeMembers')"
        >
          <template v-slot:no-data>
            {{ $t('userManagement.noResults') }}
          </template>
        </v-autocomplete>

        <v-autocomplete
          v-if="session.status !== 'IN_PREPARATION'"
          class="mb-2"
          v-model="session.electionLead"
          :items="electionLeadPossibilities"
          :rules="
            session.status === 'BEFORE_VOTING'
              ? []
              : [
                  (v) =>
                    !!v ||
                    session.electionCommittee.length === 0 ||
                    $t('session.electionLeadIsRequired'),
                ]
          "
          :label="$t('parliamentManagement.electionLead')"
        >
          <template v-slot:no-data>
            {{ $t('session.pickLeadFromCommittee') }}
          </template>
        </v-autocomplete>

        <v-btn color="primary" class="my-5" large @click="handleSubmit">
          <v-icon left>mdi-content-save</v-icon>
          {{ $t('common.save') }}
        </v-btn>

        <v-overlay :value="isLoading">
          <v-progress-circular indeterminate size="64"></v-progress-circular>
        </v-overlay>
      </v-form>
    </div>
  </common-modal>
</template>
<script>
import { mapActions, mapState } from 'vuex';
import remoteConfig from '../../../utils/remoteConfig';

export default {
  data() {
    return {
      valid: null,
      minimalNumberOfPeopleInCommittee: null,
      session: {
        id: null,
        name: '',
        date: null,
        place: '',
        electionLead: '',
        electionCommittee: [],
      },
      committeeSearchInput: '',
    };
  },
  computed: {
    ...mapState('membersManagement', ['members']),
    ...mapState('parliamentPreparation', ['isLoading']),
    membersList() {
      if (!this.members[this.session.id]) {
        return [];
      }

      return this.members[this.session.id].map((member) => ({
        text: member.fullName,
        value: { id: member.id, fullName: member.fullName },
      }));
    },
    electionLeadPossibilities() {
      if (this.session.electionCommittee == null) return [];
      return this.session.electionCommittee.map((member) => ({
        text: member.fullName,
        value: member,
      }));
    },
  },
  methods: {
    ...mapActions('membersManagement', ['loadMembers']),
    ...mapActions('parliamentPreparation', ['editParliamentDetails']),
    async beforeOpen(args) {
      this.session = JSON.parse(JSON.stringify(args.params));
      this.session.date = args.params.date.substring(0, 10);

      this.loadMembers({
        sessionIdToLoad: this.session.id,
        takeStateFromCache: true,
      });
      this.getMinimalNumberOfPeopleInCommittee();
    },
    async getMinimalNumberOfPeopleInCommittee() {
      this.minimalNumberOfPeopleInCommittee = (
        await remoteConfig.getRemoteConfig()
      ).minimalNumberOfPeopleInCommittee;
    },
    handleSubmit() {
      this.$refs.form.validate();
      if (this.valid) {
        this.session.electionCommittee = this.session.electionCommittee.map(
          (member) => member.id,
        );
        if (
          this.session.electionLead != null &&
          this.session.electionLead !== ''
        ) {
          this.session.electionLeadId = this.session.electionLead.id;
        }
        if (
          this.session.electionCommittee == null ||
          this.session.electionCommittee.length === 0
        ) {
          this.session.electionLeadId = null;
        }

        this.editParliamentDetails(this.session).then(() => {
          this.$modal.hide('editSessionModal');
        });
      }
    },
    beforeClose() {
      this.$refs.form.reset();
    },
  },
};
</script>
