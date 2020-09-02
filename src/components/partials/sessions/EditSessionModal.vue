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
          :allowed-dates="allowedDays"
          required
        ></v-date-picker>

        <v-autocomplete
          v-if="session.status !== 'IN_PREPARATION'"
          class="mb-2"
          v-model="session.electionLead"
          :items="membersList"
          :rules="
            session.status === 'BEFORE_VOTING'
              ? []
              : [(v) => !!v || $t('session.electionLeadIsRequired')]
          "
          :label="$t('parliamentManagement.electionLead')"
        >
          <template v-slot:no-data>
            {{ $t('userManagement.noResults') }}
          </template>
        </v-autocomplete>

        <v-autocomplete
          v-if="session.status !== 'IN_PREPARATION'"
          v-model="session.electionCommittee"
          :items="membersList"
          multiple
          chips
          deletable-chips
          :rules="
            session.status === 'BEFORE_VOTING'
              ? []
              : [
                  (v) =>
                    (!!v && v.length >= 4) ||
                    $t('session.committeeAtLeastMembers', { amount: 4 }),
                ]
          "
          :label="$t('session.committeeMembers')"
        >
          <template v-slot:no-data>
            {{ $t('userManagement.noResults') }}
          </template>
        </v-autocomplete>

        <v-btn color="primary" class="my-5" large @click="handleSubmit">
          <v-icon left>mdi-content-save</v-icon>
          {{ $t('common.save') }}
        </v-btn>
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
        id: null,
        name: '',
        date: null,
        place: '',
        electionLead: '',
        electionCommittee: [],
      },
    };
  },
  computed: {
    ...mapState('membersManagement', ['members']),
    membersList() {
      if (!this.members[this.session.id]) {
        return [];
      }

      return this.members[this.session.id].map((member) => ({
        text: member.fullName,
        value: member.id,
      }));
    },
  },
  methods: {
    ...mapActions('membersManagement', ['loadMembers']),
    ...mapActions('parliamentPreparation', ['editParliamentDetails']),
    beforeOpen(args) {
      this.session = JSON.parse(JSON.stringify(args.params));
      this.session.date = new Date(this.session.date)
        .toISOString()
        .substring(0, 10);

      this.loadMembers({
        sessionIdToLoad: this.session.id,
        takeStateFromCache: true,
      });
    },
    handleSubmit() {
      this.$refs.form.validate();
      if (this.valid) {
        this.editParliamentDetails(this.session);
      }
    },
    beforeClose() {
      this.$refs.form.reset();
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
