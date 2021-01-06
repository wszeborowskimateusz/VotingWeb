<template>
  <div v-if="activeSession == null">
    <!-- TODO: Handle Mistake ? -->
  </div>
  <div
    v-else-if="activeSession.status === 'IN_PREPARATION'"
    class="justify-content-center d-flex flex-column"
  >
    <div>
      <img
        class="image mb-5 rounded"
        :src="imagesGetter.getImgUrl('in_preparation.jpg')"
      />
    </div>
  </div>
  <div v-else>
    <h3 class="mb-5">{{ $t('session.enterCommitee') }}</h3>
    <v-form ref="form" v-model="valid">
      <v-autocomplete
        v-model="committee"
        :items="membersList"
        multiple
        chips
        deletable-chips
        :search-input.sync="committeeSearchInput"
        @change="committeeSearchInput = ''"
        :rules="[
          (v) =>
            (!!v && (v.length === 0 || v.length >= minimalNumberOfMembers)) ||
            $t('session.committeeAtLeastMembers', {
              amount: minimalNumberOfMembers,
            }),
        ]"
        :label="$t('session.committeeMembersNoLead')"
      >
        <template v-slot:no-data>
          {{ $t('userManagement.noResults') }}
        </template>
      </v-autocomplete>

      <v-autocomplete
        class="mb-2"
        v-model="electionLead"
        :items="electionLeadPossibilities"
        :rules="[
          (v) =>
            !!v ||
            committee.length === 0 ||
            $t('session.electionLeadIsRequired'),
        ]"
        :label="$t('parliamentManagement.electionLead')"
      >
        <template v-slot:no-data>
          {{ $t('session.pickLeadFromCommittee') }}
        </template>
      </v-autocomplete>

      <div class="flex-row d-flex justify-content-center mt-5">
        <v-btn color="success" class="mx-3 shadow" @click="handleSubmit">
          <v-icon left>mdi-play</v-icon>
          {{ $t('sessionActions.goToVotings') }}
        </v-btn>
      </div>
    </v-form>
  </div>
</template>
<style scoped>
.image {
  width: 100%;
  max-width: 700px;
}

.display {
  display: block;
}
</style>
<script>
import { mapGetters, mapActions } from 'vuex';
import imagesGetter from '../../utils/imagesGetter';
import remoteConfig from '../../utils/remoteConfig';

export default {
  name: 'SessionPreparation',
  data() {
    return {
      imagesGetter,
      minimalNumberOfMembers: null,
      valid: null,
      electionLead: '',
      committee: [],
      committeeSearchInput: '',
    };
  },
  async created() {
    this.electionLead = this.activeSession.electionLead;
    this.committee = this.activeSession.electionCommittee;
    this.minimalNumberOfMembers = (
      await remoteConfig.getRemoteConfig()
    ).minimalNumberOfPeopleInCommittee;
  },
  computed: {
    ...mapGetters('membersManagement', ['activeSessionMembers']),
    ...mapGetters('parliamentManagement', ['activeSession']),
    membersList() {
      if (!this.activeSessionMembers) {
        return [];
      }

      return this.activeSessionMembers.map((member) => ({
        text: member.fullName,
        value: { id: member.id, fullName: member.fullName },
      }));
    },
    electionLeadPossibilities() {
      if (this.committee == null) return [];
      return this.committee.map((member) => ({
        text: member.fullName,
        value: member,
      }));
    },
  },
  watch: {
    committee: {
      immediate: true,
      async handler() {
        await this.$nextTick();
        this.$refs.form.validate();
      },
    },
  },
  methods: {
    ...mapActions('parliamentPreparation', ['editParliamentDetails']),
    ...mapActions('parliamentManagement', ['startSession']),
    handleSubmit() {
      this.$refs.form.validate();
      if (this.valid) {
        this.editParliamentDetails({
          electionLeadId:
            this.electionLead == null ? null : this.electionLead.id,
          electionCommittee: this.committee.map((member) => member.id),
        }).then(() => this.startSession(this.activeSession.id));
      }
    },
  },
};
</script>
