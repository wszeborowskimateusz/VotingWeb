<template>
  <v-container>
    <div v-if="voting != null">
      <h2 class="mb-5">
        <router-link to="/" style="text-decoration: none; color: inherit;">{{
          voting.name
        }}</router-link>
      </h2>
      {{ $t('parliamentManagement.status') }}:
      <h5 class="font-weight-bold d-inline ml-2">
        {{ $t(`voting.statusTypes.${voting.status}`) }}
      </h5>
    </div>

    <FinishVotingButton
      v-if="voting != null"
      class="my-5"
      v-model="isFinishVotingDialogShown"
      :voting="voting"
      @voting-finished="$router.push('/')"
    />

    <div class="d-flex justify-content-center">
      <div class="d-flex flex-column ">
        <div class="mb-2 d-block">
          {{
            $t('voting.votedAmount', [
              amountOfAlreadyVotedPresentVoters,
              amountOfPresentVoters,
            ])
          }}
          <v-btn
            fab
            dark
            class="ml-4 mb-2"
            @click="refreshState"
            color="blue darken-2"
          >
            <v-icon dark>mdi-refresh</v-icon>
          </v-btn>
        </div>
        <div class="p-4 border rounded">
          <div class="d-flex" v-for="group in voterGroups" :key="group.name">
            <div
              class="rounded mr-2"
              :style="{
                'background-color': group.color,
                height: '20px',
                width: '20px',
              }"
              v-if="!group.hidden"
            />
            {{ group.name }}
          </div>

          <div class="mt-5">
            <span class="p-2 border rounded"
              >{{ $t('userManagement.numberInSquare') }} -
              {{ $t('userManagement.mandateNumber') }}</span
            >
          </div>
        </div>
      </div>
    </div>

    <loader
      class="mt-2"
      :style="{
        visibility: isLoadingMembers || isLoadingVotings ? 'visible' : 'hidden',
      }"
    />

    <div
      v-for="(votersList, index) in [
        votedOrPresent,
        absentThatNotVoted,
        blocked,
      ]"
      :key="'list number' + index"
    >
      <v-divider v-if="votersList.length !== 0" />
      <v-row align="center" justify="center">
        <template v-for="(user, i) in votersList">
          <v-col :key="i" md="1">
            <v-hover v-slot="{ hover }">
              <v-card
                :elevation="hover ? 12 : 2"
                :class="{ 'on-hover': hover }"
                :style="{
                  'background-color': getVoterColor(user),
                  'background-image': getVoterColor(user),
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
import FinishVotingButton from '../partials/votings/FinishVotingButton.vue';

export default {
  data() {
    return {
      isFinishVotingDialogShown: false,
      refreshTimer: null,
      refreshTimerInterval: 30000,
      voterGroups: [
        {
          hidden: true,
          name: '',
          color: 'linear-gradient(135deg, #03A9F4 50%, #F25252 50%)',
          userFilter: (v) => v.didVote && v.isBlocked,
        },
        {
          name: this.$t('voting.alreadyVoted'),
          color: '#03A9F4',
          userFilter: (v) => v.didVote,
        },
        {
          name: this.$t('voting.notVotedYet'),
          color: '#FF9800',
          userFilter: (v) => !v.absent,
        },
        {
          name: this.$t('voting.absentAndDidNotVote'),
          color: '#A8A7A7',
          userFilter: (v) => v.absent && !v.didVote && !v.isBlocked,
        },
        {
          name: this.$t('voting.blocked'),
          color: '#F25252',
          userFilter: (v) => v.isBlocked,
        },
      ],
    };
  },
  computed: {
    ...mapState('votingsManagement', {
      alreadyVotedLists: 'alreadyVotedLists',
      isLoadingVotings: 'isLoading',
    }),
    ...mapGetters('votingsManagement', ['votingById']),
    ...mapState('membersManagement', { isLoadingMembers: 'isLoading' }),
    ...mapGetters('membersManagement', ['membersThatHaveVote']),
    votingId() {
      return parseInt(this.$route.params.votingId, 10);
    },
    voting() {
      return this.votingById(parseInt(this.votingId, 10));
    },
    alreadyVoted() {
      if (this.alreadyVotedLists == null) return null;
      return this.alreadyVotedLists[this.votingId];
    },
    votedList() {
      if (this.membersThatHaveVote == null || this.alreadyVoted == null) {
        return [];
      }
      return this.membersThatHaveVote
        .map((member) => {
          const inAlreadyVoted = this.alreadyVoted.find(
            (voted) => voted === member.id,
          );
          return {
            fullName: member.fullName,
            mandateNumber: member.mandateNumber,
            didVote: inAlreadyVoted != null,
            absent: member.absent,
            isBlocked: member.isBlocked,
          };
        })
        .sort((a, b) => a.mandateNumber - b.mandateNumber);
    },
    blocked() {
      return this.votedList.filter(
        (v) => v.isBlocked && !this.votedOrPresent.includes(v),
      );
    },
    votedOrPresent() {
      return this.votedList.filter((v) => v.didVote || !v.absent);
    },
    absentThatNotVoted() {
      return this.votedList.filter(
        (v) => !v.didVote && v.absent && !v.isBlocked,
      );
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
    this.loadAlreadyVotedList(this.votingId);
    this.refreshtTimer = setInterval(
      this.refreshState,
      this.refreshTimerInterval,
    );
  },
  beforeDestroy() {
    clearInterval(this.refreshtTimer);
  },
  methods: {
    ...mapActions('votingsManagement', ['loadAlreadyVotedList', 'loadVotings']),
    ...mapActions('membersManagement', ['loadMembers']),
    refreshState() {
      this.loadAlreadyVotedList(this.votingId);
      this.loadMembers();
    },
    getVoterColor(voter) {
      /* eslint-disable no-restricted-syntax */
      for (const group of this.voterGroups) {
        if (group.userFilter(voter)) {
          return group.color;
        }
      }

      return '';
    },
  },
  components: { FinishVotingButton },
};
</script>
