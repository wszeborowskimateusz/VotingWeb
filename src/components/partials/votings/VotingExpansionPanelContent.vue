<template>
  <div>
    <v-expansion-panel-header
      ><div class="d-flex flex-fill">
        {{ voting.name }}
      </div>
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      <div
        class="d-flex mt-2"
        :class="
          voting.status === 'NOT_STARTED'
            ? 'justify-content-between'
            : voting.status === 'DURING_VOTING'
            ? 'justify-content-end'
            : 'justify-content-start'
        "
      >
        <div v-if="voting.status === 'NOT_STARTED'">
          <v-btn icon class="mr-2">
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
          :title="$t('voting.downloadVotingRaport')"
        >
          <v-icon>mdi-download</v-icon>
        </v-btn>
        <button class="btn btn-danger" v-if="voting.status === 'DURING_VOTING'">
          {{ $t('voting.finishVoting') }}
        </button>
        <button
          class="btn btn-success"
          v-else-if="voting.status === 'NOT_STARTED'"
        >
          {{ $t('voting.startVoting') }}
        </button>
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
              {{ $t(`voting.${field}`) }}:<br />
              <span v-if="enumFields.includes(field)">
                {{ $t(`voting.${field}Types.${voting[field]}`) }}
              </span>
              <span v-else-if="field === 'secrecy'">
                {{ $t(`common.${voting[field] ? 'yes' : 'no'}`) }}
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
        <v-divider v-if="voting.options.length > 0" />
        <v-list>
          <v-list-item v-for="option in voting.options" :key="option.id">
            <v-list-item-icon>
              <v-icon color="pink">mdi-star</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="option.name"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </div>
    </v-expansion-panel-content>
  </div>
</template>

<script>
export default {
  props: {
    voting: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      inEditMode: false,
      fieldsToDisplay: [
        'status',
        'majority',
        'cardinality',
        'secrecy',
        'threshold',
        'electionLead',
      ],
      enumFields: ['status', 'majority', 'cardinality'],
    };
  },
};
</script>
