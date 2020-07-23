<template>
  <v-card>
    <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        :label="$t('userManagement.search')"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="voters"
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

      <template v-slot:item.absent="props">
        {{ $t(`common.${props.item.absent ? 'yes' : 'no'}`) }}
      </template>

      <template v-slot:item.isBlocked="props">
        <div>{{ $t(`common.${props.item.isBlocked ? 'yes' : 'no'}`) }}</div>
      </template>

      <template v-slot:item.isElectionLead="props">
        {{ $t(`common.${props.item.isElectionLead ? 'yes' : 'no'}`) }}
      </template>

      <template v-slot:item.electionCommittee="props">
        {{ $t(`common.${props.item.electionCommittee ? 'yes' : 'no'}`) }}
      </template>

      <template v-slot:item.hasVote="props">
        {{ $t(`common.${props.item.hasVote ? 'yes' : 'no'}`) }}
      </template>

      <template v-slot:item.actions="{ item }">
        <v-icon
          small
          @click="changeUserBlocState(item)"
          :title="$t(`userManagement.${item.isBlocked ? 'un' : ''}blockUser`)"
        >
          {{ item.isBlocked ? 'mdi-check-circle' : 'mdi-close-circle' }}
        </v-icon>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters('parliamentManagement', ['activeSession']),
  },
  methods: {
    changeUserBlocState(user) {
      console.log(user);
    },
  },
  data() {
    return {
      search: '',
      headers: [
        { text: this.$t('userManagement.fullName'), value: 'fullName' },
        { text: this.$t('userManagement.index'), value: 'index' },
        { text: this.$t('userManagement.absent'), value: 'absent' },
        { text: this.$t('userManagement.blocked'), value: 'isBlocked' },
        {
          text: this.$t('userManagement.electionLead'),
          value: 'isElectionLead',
        },
        {
          text: this.$t('userManagement.electionCommittee'),
          value: 'electionCommittee',
        },
        { text: this.$t('userManagement.hasVote'), value: 'hasVote' },
        { text: this.$t('userManagement.actions'), value: 'actions' },
      ],
      voters: [
        {
          id: '1',
          fullName: 'Jon Snow',
          index: '123457',
          absent: false,
          isBlocked: false,
          isElectionLead: false,
          isInElectionCommittee: false,
          hasVote: true,
        },
        {
          id: '2',
          fullName: 'Jon Travolta',
          index: '123451',
          absent: true,
          isBlocked: false,
          isElectionLead: false,
          isInElectionCommittee: false,
          hasVote: true,
        },
        {
          id: '3',
          fullName: 'Sławomir Mentzen',
          index: '123487',
          absent: false,
          isBlocked: true,
          isElectionLead: false,
          isInElectionCommittee: false,
          hasVote: true,
        },
        {
          id: '4',
          fullName: 'Borris Johnson',
          index: '123467',
          absent: false,
          isBlocked: false,
          isElectionLead: false,
          isInElectionCommittee: false,
          hasVote: false,
        },
        {
          id: '5',
          fullName: 'Bill Gates',
          index: '123434',
          absent: false,
          isBlocked: false,
          isElectionLead: false,
          isInElectionCommittee: true,
          hasVote: true,
        },
        {
          id: '6',
          fullName: 'Melinda Gates',
          index: '234123',
          absent: true,
          isBlocked: true,
          isElectionLead: false,
          isInElectionCommittee: false,
          hasVote: true,
        },
        {
          id: '7',
          fullName: 'Steven Boris',
          index: '123452',
          absent: false,
          isBlocked: false,
          isElectionLead: true,
          isInElectionCommittee: true,
          hasVote: true,
        },
        {
          id: '8',
          fullName: 'Bill Gates',
          index: '123434',
          absent: false,
          isBlocked: false,
          isElectionLead: false,
          isInElectionCommittee: true,
          hasVote: true,
        },
        {
          id: '9',
          fullName: 'Melinda Gates',
          index: '234123',
          absent: true,
          isBlocked: true,
          isElectionLead: false,
          isInElectionCommittee: false,
          hasVote: true,
        },
        {
          id: '10',
          fullName: 'Steven Boris',
          index: '123452',
          absent: false,
          isBlocked: false,
          isElectionLead: true,
          isInElectionCommittee: true,
          hasVote: true,
        },
        {
          id: '11',
          fullName: 'Bill Gates',
          index: '123434',
          absent: false,
          isBlocked: false,
          isElectionLead: false,
          isInElectionCommittee: true,
          hasVote: true,
        },
        {
          id: '12',
          fullName: 'Melinda Gates',
          index: '234123',
          absent: true,
          isBlocked: true,
          isElectionLead: false,
          isInElectionCommittee: false,
          hasVote: true,
        },
        {
          id: '13',
          fullName: 'Steven Boris',
          index: '123452',
          absent: false,
          isBlocked: false,
          isElectionLead: true,
          isInElectionCommittee: true,
          hasVote: true,
        },
        {
          id: '14',
          fullName: 'Bill Gates',
          index: '123434',
          absent: false,
          isBlocked: false,
          isElectionLead: false,
          isInElectionCommittee: true,
          hasVote: true,
        },
        {
          id: '15',
          fullName: 'Melinda Gates',
          index: '234123',
          absent: true,
          isBlocked: true,
          isElectionLead: false,
          isInElectionCommittee: false,
          hasVote: true,
        },
        {
          id: '16',
          fullName: 'Steven Boris',
          index: '123452',
          absent: false,
          isBlocked: false,
          isElectionLead: true,
          isInElectionCommittee: true,
          hasVote: true,
        },
      ],
    };
  },
};
</script>
