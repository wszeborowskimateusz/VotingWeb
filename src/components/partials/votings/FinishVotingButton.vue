<template>
  <div>
    <v-btn
      color="error"
      v-if="voting.status === 'DURING_VOTING'"
      @click="$emit('input', true)"
    >
      {{ $t('voting.finishVoting') }}
    </v-btn>
    <ConfirmationDialog
      :header="$t('voting.areYouSureToFinish', { votingName: voting.name })"
      :description="$t('sessionActions.actionIsIrreversible')"
      v-model="isFinishVotingDialogShown"
      @callback="closeVotingWithCallback()"
    />
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      isFinishVotingDialogShown: this.value,
    };
  },
  watch: {
    isFinishVotingDialogShown(newValue) {
      this.$emit('input', newValue);
    },
    value(newValue) {
      this.isFinishVotingDialogShown = newValue;
    },
  },
  props: {
    value: {
      type: Boolean,
      required: true,
    },
    voting: {
      type: Object,
      required: true,
    },
    pushHome: {
      type: Boolean,
      required: false,
      default: () => false,
    },
  },
  methods: {
    ...mapActions('votingsManagement', ['closeVoting']),
    async closeVotingWithCallback() {
      await this.closeVoting(this.voting.id).then(() => {
        this.$root.$emit('closeVoting');
        if (this.pushHome) {
          this.$router.push('/');
        }
      });
    },
  },
};
</script>
