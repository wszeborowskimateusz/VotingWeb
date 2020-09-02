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

      <template v-slot:item.mandateNumber="props">
        <span v-if="props.item.mandateNumber">{{
          props.item.mandateNumber
        }}</span>
        <span v-else>-</span>
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

      <template v-slot:item.isInElectionCommittee="props">
        {{ $t(`common.${props.item.isInElectionCommittee ? 'yes' : 'no'}`) }}
      </template>

      <template v-slot:item.actions="{ item }">
        <v-btn
          small
          :title="$t(`userManagement.${item.isBlocked ? 'un' : ''}blockUser`)"
          @click="changeUserBlocState(item)"
          :color="item.isBlocked ? 'success' : 'error'"
        >
          <v-icon small left>
            {{ item.isBlocked ? 'mdi-check-circle' : 'mdi-close-circle' }}
          </v-icon>
          {{ $t(`userManagement.${item.isBlocked ? 'un' : ''}block`) }}
        </v-btn>
      </template>
    </v-data-table>
    <div v-if="!activeSession && !isLoading" class="mr-5">
      <div class="py-5">
        <span class="h3 mr-2">{{
          $t('parliamentManagement.noActiveSession')
        }}</span>
        <Tooltip modalName="no active session tooltip - user management">
          {{ $t('parliamentManagement.noActiveSessionTooltip') }}
        </Tooltip>
      </div>
    </div>
  </v-card>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex';

export default {
  computed: {
    ...mapState('membersManagement', ['isLoading']),
    ...mapGetters('parliamentManagement', ['activeSession']),
    ...mapGetters('membersManagement', ['activeSessionMembers']),
    headers() {
      return [
        { text: this.$t('userManagement.fullName'), value: 'fullName' },
        { text: this.$t('userManagement.index'), value: 'index' },
        {
          text: this.$t('userManagement.mandateNumber'),
          value: 'mandateNumber',
        },
        { text: this.$t('userManagement.absent'), value: 'absent' },
        { text: this.$t('userManagement.blocked'), value: 'isBlocked' },
        {
          text: this.$t('userManagement.electionLead'),
          value: 'isElectionLead',
        },
        {
          text: this.$t('userManagement.electionCommittee'),
          value: 'isInElectionCommittee',
        },
        { text: this.$t('userManagement.actions'), value: 'actions' },
      ];
    },
  },
  mounted() {
    this.loadMembers();
  },
  methods: {
    ...mapActions('membersManagement', [
      'loadMembers',
      'changeVoterBlockStatus',
    ]),
    changeUserBlocState(user) {
      this.changeVoterBlockStatus({
        voterId: user.id,
        isBlocked: !user.isBlocked,
      });
    },
  },
  data() {
    return {
      search: '',
    };
  },
};
</script>
