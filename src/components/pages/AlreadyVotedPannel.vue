<template>
  <v-container>
    <h2 class="mb-5" v-if="duringVoting.length > 0">
      {{ duringVoting[0].name }}
    </h2>
    <div class="d-flex justify-content-center">
      <div class="d-flex flex-column">
        <div class="d-flex">
          <div
            class="rounded mr-2"
            style="background-color: #03A9F4; height: 20px; width: 20px;"
          />
          {{ $t('voting.alreadyVoted') }}
        </div>

        <div class="d-flex">
          <div
            class="rounded mr-2"
            style="background-color: #FF9800; height: 20px; width: 20px;"
          />
          {{ $t('voting.notVotedYet') }}
        </div>

        <span class="mt-2 p-2 border rounded"
          >{{ $t('userManagement.numberInSquare') }} -
          {{ $t('userManagement.mandateNumber') }}</span
        >
      </div>
    </div>

    <loader
      :style="{
        visibility: isLoadingMembers || isLoadingVotings ? 'visible' : 'hidden',
      }"
    />

    <v-row align="center" justify="center">
      <template v-for="(user, i) in votedList">
        <v-col :key="i" md="1">
          <v-hover v-slot:default="{ hover }">
            <v-card
              :elevation="hover ? 12 : 2"
              :class="{ 'on-hover': hover }"
              :style="{
                'background-color': user.didVote ? '#03A9F4' : '#FF9800',
              }"
            >
              <v-card-title class="title ">
                <v-row class="fill-height flex-column" justify="start">
                  <p class="body-1 font-weight-bold font-italic text-left">
                    {{ user.mandateNumber }}
                  </p>
                </v-row>
              </v-card-title>
            </v-card>
          </v-hover>
        </v-col>
      </template>
    </v-row>
  </v-container>
</template>

<style scoped>
.v-card {
  transition: opacity 0.4s ease-in-out;
}

.v-card:not(.on-hover) {
  opacity: 0.8;
}
</style>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';

export default {
  computed: {
    ...mapState('votingsManagement', {
      alreadyVotedLists: 'alreadyVotedLists',
      isLoadingVotings: 'isLoading',
    }),
    ...mapGetters('votingsManagement', ['duringVoting']),
    ...mapState('membersManagement', { isLoadingMembers: 'isLoading' }),
    ...mapGetters('membersManagement', ['presentVoters']),
    alreadyVoted() {
      if (this.alreadyVotedLists == null) return null;
      return this.alreadyVotedLists[this.$route.params.votingId];
    },
    votedList() {
      if (this.presentVoters == null || this.alreadyVoted == null) {
        return [];
      }
      return this.presentVoters.map((member) => {
        const inAlreadyVoted = this.alreadyVoted.find(
          (voted) => voted === member.id,
        );
        return {
          fullName: member.fullName,
          mandateNumber: member.mandateNumber,
          didVote: inAlreadyVoted != null,
        };
      });
    },
  },
  mounted() {
    this.loadVotings();
    this.loadMembers();
    this.loadAlreadyVotedList(this.$route.params.votingId);
  },
  methods: {
    ...mapActions('votingsManagement', ['loadAlreadyVotedList', 'loadVotings']),
    ...mapActions('membersManagement', ['loadMembers']),
  },
};
</script>
