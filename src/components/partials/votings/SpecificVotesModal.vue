<template>
  <common-modal :name="modalName" :height="300">
    <v-card-title class="mt-4">
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        :label="$t('userManagement.search')"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      v-if="specificVotesWithMembers != null"
      :headers="headers"
      :items="specificVotesWithMembers"
      class="elevation-1"
      :search="search"
      :locale="$i18n.locale"
      disable-pagination
      hide-default-footer
      multi-sort
      align="center"
    >
      <template v-slot:no-results>
        {{ $t('userManagement.noResults') }}
      </template>

      <template v-slot:no-data>
        {{ $t('userManagement.noResults') }}
      </template>

      <template v-slot:[`item.voteType`]="props">
        <v-img
          :src="imagesGetter.getImgUrl(getIcon(props.item.voteType))"
          height="25"
          width="25"
        />
      </template>
    </v-data-table>
  </common-modal>
</template>

<script>
import imagesGetter from '@/utils/imagesGetter';
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      imagesGetter,
      search: '',
      headers: [
        { text: this.$t('voting.vote'), value: 'voteType' },
        { text: this.$t('userManagement.fullName'), value: 'name' },
        { text: this.$t('userManagement.mandateNumber'), value: 'mandateNumber' },
      ],
    };
  },
  props: {
    modalName: {
      type: String,
      required: true,
    },
    specificVotes: {
      type: Array,
      required: true,
    },
  },
  computed: {
    ...mapGetters('membersManagement', ['activeSessionMemberById']),
    specificVotesWithMembers() {
      if (this.specificVotes == null) return null;

      return this.specificVotes
        .filter((vote) => vote.voteType !== 'NO_VOTE')
        .map((specificVote) => {
          const voter = this.activeSessionMemberById(specificVote.voterId);

          return {
            voteType: specificVote.voteType,
            name: voter?.fullName ?? '',
            mandateNumber: voter?.mandateNumber ?? '',
          };
        });
    },
  },
  methods: {
    getIcon(voteType) {
      if (voteType === 'FOR') return 'successful.svg';
      if (voteType === 'AGAINST') return 'unsuccessful.svg';
      if (voteType === 'HOLD') return 'hold.svg';

      return '';
    },
  },
};
</script>
