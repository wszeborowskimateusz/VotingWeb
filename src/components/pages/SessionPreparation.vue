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
        class="mb-2"
        v-model="electionLead"
        :items="membersList"
        :rules="[(v) => !!v || $t('session.electionLeadIsRequired')]"
        :label="$t('parliamentManagement.electionLead')"
      >
        <template v-slot:no-data>
          {{ $t('userManagement.noResults') }}
        </template>
      </v-autocomplete>

      <v-autocomplete
        v-model="committee"
        :items="membersList"
        multiple
        chips
        deletable-chips
        :rules="[
          (v) =>
            (!!v && v.length >= minimalNumberOfMembers) ||
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

export default {
  name: 'SessionPreparation',
  data() {
    return {
      imagesGetter,
      minimalNumberOfMembers: 4,
      valid: null,
      electionLead: '',
      committee: [],
    };
  },
  created() {
    this.electionLead = this.activeSession.electionLead;
    this.committee = this.activeSession.electionCommittee;
  },
  computed: {
    ...mapGetters('membersManagement', ['activeSessionMembers']),
    ...mapGetters('parliamentManagement', ['activeSession']),
    usersWithoutElectionLead() {
      return this.users.filter((user) => user !== this.electionLead);
    },
    isCommitteeBigEnough() {
      return this.committee.length >= this.minimalNumberOfMembers;
    },
    membersList() {
      if (!this.activeSessionMembers) {
        return [];
      }

      return this.activeSessionMembers.map((member) => ({
        text: member.fullName,
        value: member.id,
      }));
    },
  },
  methods: {
    ...mapActions('parliamentPreparation', ['editParliamentDetails']),
    ...mapActions('parliamentManagement', ['startSession']),
    handleSubmit() {
      this.$refs.form.validate();
      if (this.valid) {
        this.editParliamentDetails({
          electionLeadId: this.electionLead,
          electionCommittee: this.electionCommittee,
        }).then(() => this.startSession(this.activeSession.id));
      }
    },
  },
};
</script>
