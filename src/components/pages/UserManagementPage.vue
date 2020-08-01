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
      v-if="activeSessionMembers != null"
      :headers="headers"
      :items="activeSessionMembers"
      class="elevation-1"
      :search="search"
      :locale="$i18n.locale"
      disable-pagination
      hide-default-footer
      multi-sort
      align="center"
      :loading="isLoading"
      :loading-text="$t('common.loading')"
    >
      <template v-slot:no-results>
        {{ $t('userManagement.noResults') }}
      </template>

      <template v-slot:no-data>
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
        {{ $t(`common.${props.item.isInElectionCommittee ? 'yes' : 'no'}`) }}
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
import { mapGetters, mapState, mapActions } from 'vuex';

export default {
  computed: {
    ...mapState('membersManagement', ['isLoading']),
    ...mapGetters('parliamentManagement', ['activeSession']),
    ...mapGetters('membersManagement', ['activeSessionMembers']),
  },
  mounted() {
    this.loadMembers();
  },
  methods: {
    ...mapActions('membersManagement', ['loadMembers']),
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
    };
  },
};
</script>
