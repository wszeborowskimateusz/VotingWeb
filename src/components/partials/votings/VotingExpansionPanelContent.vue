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
          <v-btn icon class="mr-2" @click="isDeleteVotingDialogShown = true">
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
          @click="isFinishVotingDialogShown = true"
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
                :results="getResults(option.id)"
                :secret="voting.secrecy"
                :votingKey="`${voting.id}|${option.id}`"
              />
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </div>
    </v-expansion-panel-content>
    <ConfirmationDialog
      :header="$t('voting.areYouSureToRemove', { votingName: voting.name })"
      :description="$t('sessionActions.actionIsIrreversible')"
      v-model="isDeleteVotingDialogShown"
      @callback="deleteVoting(voting.id)"
    />
    <ConfirmationDialog
      :header="$t('voting.areYouSureToFinish', { votingName: voting.name })"
      :description="$t('sessionActions.actionIsIrreversible')"
      v-model="isFinishVotingDialogShown"
      @callback="closeVoting(voting.id)"
    />
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
      isDeleteVotingDialogShown: false,
      isFinishVotingDialogShown: false,
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
      if (this.voting.options == null) {
        return [];
      }

      if (this.voting.cardinality === 'SINGLE_CHOICE') {
        return [{ name: this.voting.name }];
      }

      if (this.voting.status !== 'FINISHED') {
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
    getResults(optionId) {
      if (this.voting.status !== 'FINISHED') {
        return null;
      }

      return this.voting.cardinality === 'SINGLE_CHOICE'
        ? this.voting.results
        : this.voting.results[optionId];
    },
    pickStarColor(optionId) {
      if (this.voting.status !== 'FINISHED') return 'grey';
      const results = this.getResults(optionId);

      if (results.wasSuccessful) {
        return 'green';
      }

      return 'red';
    },
    pickStarTitle(optionId) {
      if (this.voting.status !== 'FINISHED') {
        return this.$t('voting.votingNotFinished');
      }

      const results = this.getResults(optionId);

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
