<template>
  <v-container>
    <h2 class="mb-5" v-if="duringVoting.length > 0">
      {{ duringVoting[0].name }}
    </h2>
    <div class="d-flex justify-content-center">
      <div class="d-flex flex-column ">
        <div class="mb-2 d-block">
          {{
            $t('voting.votedAmount', [
              amountOfAlreadyVotedPresentVoters,
              amountOfPresentVoters,
            ])
          }}
        </div>
        <div class="p-4 border rounded">
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

          <div class="d-flex mb-5">
            <div
              class="rounded mr-2"
              style="background-color: #A8A7A7; height: 20px; width: 20px;"
            />
            {{ $t('voting.absentAndDidNotVote') }}
          </div>

          <span class="mt-2 p-2 border rounded"
            >{{ $t('userManagement.numberInSquare') }} -
            {{ $t('userManagement.mandateNumber') }}</span
          >
        </div>
      </div>
    </div>

    <loader
      :style="{
        visibility: isLoadingMembers || isLoadingVotings ? 'visible' : 'hidden',
      }"
    />

    <div
      v-for="(votersList, index) in [votedOrPresent, absentThatNotVoted]"
      :key="'list number' + index"
    >
      <v-row align="center" justify="center">
        <template v-for="(user, i) in votersList">
          <v-col :key="i" md="1">
            <v-hover v-slot="{ hover }">
              <v-card
                :elevation="hover ? 12 : 2"
                :class="{ 'on-hover': hover }"
                :style="{
                  'background-color': user.didVote
                    ? '#03A9F4'
                    : user.absent
                    ? '#A8A7A7'
                    : '#FF9800',
                }"
              >
                <v-card-title>
                  <v-row class="fill-height flex-column">
                    <p class="body-1 font-weight-bold text-center">
                      {{ user.mandateNumber }}
                    </p>
                  </v-row>
                </v-card-title>
              </v-card>
            </v-hover>
          </v-col>
        </template>
      </v-row>
      <v-divider />
    </div>
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
  data() {
    return {
      refreshTimer: null,
      refreshTimerInterval: 30000,
    };
  },
  computed: {
    ...mapState('votingsManagement', {
      alreadyVotedLists: 'alreadyVotedLists',
      isLoadingVotings: 'isLoading',
    }),
    ...mapGetters('votingsManagement', ['duringVoting']),
    ...mapState('membersManagement', { isLoadingMembers: 'isLoading' }),
    ...mapGetters('membersManagement', ['membersThatHaveVote']),
    alreadyVoted() {
      if (this.alreadyVotedLists == null) return null;
      return this.alreadyVotedLists[this.$route.params.votingId];
    },
    votedList() {
      if (this.membersThatHaveVote == null || this.alreadyVoted == null) {
        return [];
      }
      return this.membersThatHaveVote.map((member) => {
        const inAlreadyVoted = this.alreadyVoted.find(
          (voted) => voted === member.id,
        );
        return {
          fullName: member.fullName,
          mandateNumber: member.mandateNumber,
          didVote: inAlreadyVoted != null,
          absent: member.absent,
        };
      });
    },
    votedOrPresent() {
      return this.votedList.filter((v) => v.didVote || !v.absent);
    },
    absentThatNotVoted() {
      return this.votedList.filter((v) => v.absent && !v.didVote);
    },
    amountOfAlreadyVotedPresentVoters() {
      return this.votedOrPresent.filter((v) => v.didVote).length;
    },
    amountOfPresentVoters() {
      return this.votedOrPresent.length;
    },
  },
  mounted() {
    this.loadVotings();
    this.loadMembers();
    this.loadAlreadyVotedList(this.$route.params.votingId);
    this.refreshtTimer = setInterval(() => {
      this.loadAlreadyVotedList(this.$route.params.votingId);
      this.loadMembers();
    }, this.refreshTimerInterval);
  },
  beforeDestroy() {
    clearInterval(this.refreshtTimer);
  },
  methods: {
    ...mapActions('votingsManagement', ['loadAlreadyVotedList', 'loadVotings']),
    ...mapActions('membersManagement', ['loadMembers']),
  },
};
</script>
