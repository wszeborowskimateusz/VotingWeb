<template>
  <div class="mb-5">
    <h3 class="mb-3">Voting in progress</h3>
    <v-row justify="center">
      <v-expansion-panels :focusable="true" :value="0">
        <v-expansion-panel>
          <v-expansion-panel-header
            ><div class="">
              {{ votingInProgress.name }}
            </div>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <div class="d-flex justify-content-end mt-2">
              <button class="btn btn-danger">
                {{ $t('voting.finishVoting') }}
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
                  <div>
                    {{ $t(`voting.${field}`) }}:<br />
                    <span v-if="field === 'majority'">
                      {{
                        $t(`voting.majorityTypes.${votingInProgress[field]}`)
                      }}
                    </span>
                    <span v-else-if="field === 'cardinality'">
                      {{
                        $t(`voting.cardinalityTypes.${votingInProgress[field]}`)
                      }}
                    </span>
                    <span v-else-if="field === 'secrecy'">
                      {{
                        $t(`common.${votingInProgress[field] ? 'yes' : 'no'}`)
                      }}
                    </span>
                    <span v-else>
                      {{ votingInProgress[field] }}
                    </span>
                  </div>
                  <v-divider
                    v-if="index !== fieldsToDisplay.length - 1"
                    vertical
                    class="mx-4"
                  />
                </div>
              </div>
              <v-divider v-if="votingInProgress.options.length > 0" />

              <v-list>
                <v-list-item
                  v-for="option in votingInProgress.options"
                  :key="option.id"
                >
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
        </v-expansion-panel>
      </v-expansion-panels>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      votingInProgress: {
        id: 10,
        name:
          'Głosowanie ws. wyboru członków Komisji Prawno Rewizyjnej: kandydat(ka)',
        majority: 'ABSOLUTE',
        cardinality: 'MULTIPLE_CHOICE',
        secrecy: true,
        status: 'DURING_VOTING',
        threshold: 2,
        electionLead: 'Zbigniew Stonoga',
        options: [
          { id: 1, name: 'Anna Winiarska' },
          { id: 2, name: 'Marta Rutkowska' },
          { id: 3, name: 'Bartosz Nurek' },
          { id: 4, name: 'Dawid Krefta' },
        ],
      },
      fieldsToDisplay: [
        'majority',
        'cardinality',
        'secrecy',
        'threshold',
        'electionLead',
      ],
    };
  },
};
</script>
