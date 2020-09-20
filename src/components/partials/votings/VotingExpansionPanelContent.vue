<template>
  <div>
    <v-expansion-panel-header
      ><div class="d-flex justify-content-center">
        {{ voting.name }}
      </div>
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      <div
        class="d-flex mt-2"
        :class="
          voting.status === 'FINISHED'
            ? 'justify-content-start'
            : 'justify-content-between'
        "
      >
        <div v-if="voting.status === 'NOT_STARTED'">
          <v-btn icon class="mr-2" @click="deleteVoting(voting.id)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
          <v-btn
            icon
            class="ml-2"
            @click="$modal.show('newEditVoting', voting)"
          >
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </div>
        <v-btn
          icon
          v-if="voting.status === 'FINISHED'"
          @click="generateVotingReport(voting.id)"
          :title="$t('voting.downloadVotingRaport')"
        >
          <v-icon>mdi-download</v-icon>
        </v-btn>
        <v-btn
          v-if="voting.status === 'DURING_VOTING'"
          text
          color="primary"
          :link="true"
          :to="`/already-voted/${voting.id}`"
        >
          {{ $t('voting.liveVotedList') }}
        </v-btn>
        <v-btn
          color="error"
          v-if="voting.status === 'DURING_VOTING'"
          @click="closeVoting(voting.id)"
        >
          {{ $t('voting.finishVoting') }}
        </v-btn>
        <v-btn
          color="success"
          v-else-if="voting.status === 'NOT_STARTED'"
          @click="openVoting(voting.id)"
        >
          {{ $t('voting.startVoting') }}
        </v-btn>
      </div>
      <div>
        <v-divider />
        <div class="d-flex justify-content-center">
          <div
            v-for="(field, index) in fieldsToDisplay"
            :key="field"
            class="d-flex flex-row"
          >
            <div v-if="voting[field] != null" class="flex-fill">
              <span class="font-weight-bold">{{ $t(`voting.${field}`) }}</span>
              <tooltip
                v-if="field === 'cardinality'"
                class="ml-1"
                :modalName="`newEditVotingCardinalityForVoting${voting.id}`"
              >
                <span v-html="$t('voting.cardinalityTooltip')"></span>
              </tooltip>
              <tooltip
                v-if="field === 'threshold'"
                class="ml-1"
                :modalName="`newEditVotingThresholdForVoting${voting.id}`"
              >
                <span v-html="$t('voting.thresholdTooltip')"></span>
              </tooltip>
              <br />
              <span v-if="enumFields.includes(field)">
                {{ $t(`voting.${field}Types.${voting[field]}`) }}
              </span>
              <span v-else-if="field === 'secrecy'">
                {{ $t(`common.${voting[field] ? 'yes' : 'no'}`) }}
              </span>
              <span v-else-if="field === 'electionLead'">
                {{ electionLeadName }}
              </span>
              <span v-else>
                {{ voting[field] }}
              </span>
            </div>
            <v-divider
              v-if="
                index !== fieldsToDisplay.length - 1 && voting[field] != null
              "
              vertical
              class="mx-4"
            />
          </div>
        </div>

        <v-divider />
        <VotingResults
          v-if="
            voting.status === 'FINISHED' &&
              voting.cardinality === 'SINGLE_CHOICE'
          "
          :results="voting.results"
          :secret="voting.secrecy"
          :votingKey="`${voting.id}`"
        >
          <v-list-item-icon :title="pickStarTitle()" class="">
            <v-icon :color="pickStarColor()">mdi-star</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="voting.name"></v-list-item-title>
          </v-list-item-content>
        </VotingResults>
        <v-list>
          <v-list-item
            v-for="option in optionsSortedByInFavorVotes"
            :key="option.id"
          >
            <v-list-item-icon :title="pickStarTitle(option.id)">
              <v-icon :color="pickStarColor(option.id)">mdi-star</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="option.name"></v-list-item-title>
            </v-list-item-content>

            <v-list-item-action v-if="voting.status === 'FINISHED'">
              <VotingResults
                :results="voting.results[option.id]"
                :secret="voting.secrecy"
                :votingKey="`${voting.id}|${option.id}`"
              />
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </div>
    </v-expansion-panel-content>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import VotingResults from './VotingResults.vue';

export default {
  props: {
    voting: {
      type: Object,
      required: true,
    },
  },
  data() {
    const isVotingMultipleChoice =
      this.voting.cardinality === 'MULTIPLE_CHOICE';

    const fieldsToDisplay = [
      'status',
      'majority',
      'cardinality',
      'secrecy',
      'threshold',
      'electionLead',
    ];

    if (!isVotingMultipleChoice) {
      // Remove threshold
      fieldsToDisplay.splice(4, 1);
    }

    return {
      inEditMode: false,
      fieldsToDisplay,
      enumFields: ['status', 'majority', 'cardinality'],
    };
  },
  computed: {
    ...mapGetters('parliamentManagement', ['activeSession']),
    ...mapGetters('membersManagement', ['electionCommittee']),
    electionLeadName() {
      return this.electionCommittee.find(
        (member) => member.id === this.voting.electionLead,
      ).fullName;
    },
    optionsSortedByInFavorVotes() {
      if (
        !this.voting.results ||
        this.voting.options == null ||
        this.voting.options.length <= 0 ||
        this.voting.cardinality === 'SINGLE_CHOICE' ||
        this.voting.status !== 'FINISHED'
      ) {
        return this.voting.options;
      }

      const optionsWithResults = Array.from(
        this.voting.options.map((option) => ({
          ...option,
          results: this.voting.results[option.id],
        })),
      ).sort((a, b) => b.results.inFavor - a.results.inFavor);

      return optionsWithResults;
    },
  },
  methods: {
    ...mapActions('votingsManagement', [
      'openVoting',
      'deleteVoting',
      'closeVoting',
      'generateVotingReport',
    ]),
    pickStarColor(optionId) {
      if (this.voting.status !== 'FINISHED') return 'grey';
      const results =
        optionId == null ? this.voting.results : this.voting.results[optionId];

      if (results.wasSuccessful) {
        return 'green';
      }

      return 'red';
    },
    pickStarTitle(optionId) {
      if (this.voting.status !== 'FINISHED') {
        return this.$t('voting.votingNotFinished');
      }

      const results =
        optionId == null ? this.voting.results : this.voting.results[optionId];

      if (results.wasSuccessful) {
        return this.$t('voting.votingPassed');
      }

      return this.$t('voting.votingFailed');
    },
  },
  components: {
    VotingResults,
  },
};
</script>
