<template>
  <common-modal name="newEditVoting" @before-open="beforeOpen">
    <v-form ref="form" class="p-5" v-model="valid">
      <v-text-field
        v-model="voting.name"
        :rules="[(v) => !!v || $t('voting.nameRequired')]"
        :label="$t('voting.name')"
        required
      ></v-text-field>

      <v-select
        v-model="voting.majority"
        :items="getSelectItems('majority')"
        :rules="[(v) => !!v || $t('voting.majorityRequired')]"
        :label="$t('voting.majority')"
        required
      ></v-select>

      <div class="d-flex flex-fill">
        <tooltip modalName="newEditVotingCardinality">
          <span v-html="$t('voting.cardinalityTooltip')"></span>
        </tooltip>
      </div>

      <v-select
        v-model="voting.cardinality"
        :items="getSelectItems('cardinality')"
        :rules="[(v) => !!v || $t('voting.cardinalityRequired')]"
        :label="$t('voting.cardinality')"
        required
      ></v-select>

      <div
        class="d-flex flex-fill"
        v-if="voting.cardinality === 'MULTIPLE_CHOICE'"
      >
        <tooltip modalName="newEditVotingThreshold">
          <span v-html="$t('voting.thresholdTooltip')"></span>
        </tooltip>
      </div>

      <v-text-field
        v-if="voting.cardinality === 'MULTIPLE_CHOICE'"
        v-model="voting.threshold"
        type="number"
        :label="$t('voting.threshold')"
        :rules="[
          (v) => !!v || $t('voting.thresholdRequired'),
          (v) => voting.options.length > 0 || $t('voting.specifyOptions'),
          (v) =>
            (v >= 0 && v <= voting.options.length) ||
            $t('voting.thresholdMustBe', {
              from: 0,
              to: voting.options.length,
            }),
        ]"
      ></v-text-field>

      <div v-if="voting.cardinality === 'MULTIPLE_CHOICE'">
        <div class="d-flex flex-fill mb-1 align-center">
          <span class="text-left">{{ $t('voting.options') }}</span>
          <v-btn icon class="mr-2" @click="addNewOption">
            <v-icon>mdi-plus-circle</v-icon>
          </v-btn>
        </div>
        <div class="border rounded p-2 options">
          <v-text-field
            v-for="(field, index) in voting.options"
            :key="`OptionField${index}`"
            v-model="voting.options[index].name"
            :rules="[(v) => !!v || $t('voting.optionNotEmpty')]"
            :label="$t('voting.option')"
            required
            :append-icon="'mdi-minus-circle'"
            @click:append="removeOption(index)"
          ></v-text-field>
        </div>
      </div>

      <v-radio-group v-model="voting.secrecy" row>
        <template v-slot:label>
          <div>{{ $t('voting.secrecy') }}</div>
        </template>
        <v-radio :label="$t('common.yes')" :value="true"></v-radio>
        <v-radio :label="$t('common.no')" :value="false"></v-radio>
      </v-radio-group>

      <v-select
        v-model="voting.electionLead"
        :items="electionCommittee"
        :label="$t('voting.electionLead')"
        item-text="fullName"
        item-value="id"
        required
      >
        <template v-slot:no-data>
          {{ $t('userManagement.noResults') }}
        </template>
      </v-select>

      <v-btn @click="cancel" class="mr-4 mt-4">{{ $t('common.cancel') }}</v-btn>
      <v-btn @click="submit" class="mt-4">{{
        $t(`common.${editMode ? 'save' : 'create'}`)
      }}</v-btn>
    </v-form>
  </common-modal>
</template>

<style scoped>
.options {
  max-height: 20vh;
  overflow: auto;
}
</style>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      valid: true,
      editMode: false,
      voting: this.getClearVoting(),
      all_majorityTypes: ['RELATIVE', 'ABSOLUTE', 'TWO_THIRDS'],
      all_cardinalityTypes: ['SINGLE_CHOICE', 'MULTIPLE_CHOICE'],
      electionCommittee: [],
      electionLead: '',
    };
  },
  mounted() {
    this.loadMembers();
  },
  computed: {
    ...mapGetters('membersManagement', {
      initialElectionLead: 'electionLead',
      initialElectionCommittee: 'electionCommittee',
    }),
  },
  methods: {
    ...mapActions('membersManagement', ['loadMembers']),
    beforeOpen(args) {
      if (args.params) {
        this.editMode = true;
        this.electionLead = this.initialElectionLead;
        this.electionCommittee = this.initialElectionCommittee;
        this.voting = JSON.parse(JSON.stringify(args.params));
      } else {
        this.voting = this.getClearVoting();
      }
    },
    getSelectItems(field) {
      return this[`all_${field}Types`].map((val) => ({
        text: this.$t(`voting.${field}Types.${val}`),
        value: val,
      }));
    },
    addNewOption() {
      this.voting.options.push({ id: 0, name: '' });
    },
    removeOption(optionIndex) {
      if (this.voting.options.length > 1) {
        this.voting.options.splice(optionIndex, 1);
      }
    },
    getClearVoting() {
      return {
        id: 0,
        name: '',
        majority: null,
        cardinality: null,
        secrecy: true,
        threshold: null,
        electionLead: this.electionLead,
        options: [{ id: 0, name: '' }],
      };
    },
    cancel() {
      this.$modal.hide('newEditVoting');
    },
    submit() {
      this.$refs.form.validate();
    },
  },
};
</script>
