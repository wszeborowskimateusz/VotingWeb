<template>
  <v-card class="pb-5">
    <v-card-title
      class="sticky"
      :style="{
        'background-color': isDarkTheme ? '#212121' : '#ffffff',
      }"
    >
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

      <template v-slot:[`item.mandateNumber`]="props">
        <span v-if="props.item.mandateNumber">{{
          props.item.mandateNumber
        }}</span>
        <span v-else>-</span>
      </template>

      <template
        v-for="boolField in [
          'absent',
          'isBlocked',
          'isElectionLead',
          'isInElectionCommittee',
        ]"
        v-slot:[getBooleanFieldName(boolField)]="props"
      >
        <v-icon
          small
          v-bind:key="boolField"
          :color="getFieldValue(props, boolField) ? 'success' : 'error'"
        >
          {{ getFieldValue(props, boolField) ? 'mdi-check' : 'mdi-close' }}
        </v-icon>
      </template>

      <template v-slot:[`item.actions`]="{ item }">
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

<style scoped>
.sticky {
  position: sticky;
  top: 64px;
  z-index: 2;
}
.v-data-table /deep/ .sticky-header {
  position: sticky;
  top: 140px;
  z-index: 2;
}

.v-data-table /deep/ .v-data-table__wrapper {
  overflow: unset;
}

.v-data-table /deep/ .dark-background {
  background-color: #212121;
}

.v-data-table /deep/ .light-background {
  background-color: white;
}
</style>

<script>
import { mapGetters, mapState, mapActions } from 'vuex';

export default {
  computed: {
    ...mapState('membersManagement', ['isLoading']),
    ...mapGetters('parliamentManagement', ['activeSession']),
    ...mapGetters('membersManagement', ['activeSessionMembers']),
    headers() {
      return [
        {
          text: this.$t('userManagement.fullName'),
          value: 'fullName',
          class: this.stickyHeaders,
        },
        {
          text: this.$t('userManagement.index'),
          value: 'index',
          class: this.stickyHeaders,
        },
        {
          text: this.$t('userManagement.mandateNumber'),
          value: 'mandateNumber',
          class: this.stickyHeaders,
        },
        {
          text: this.$t('userManagement.present'),
          value: 'absent',
          align: 'center',
          class: this.stickyHeaders,
        },
        {
          text: this.$t('userManagement.blocked'),
          value: 'isBlocked',
          align: 'center',
          class: this.stickyHeaders,
        },
        {
          text: this.$t('userManagement.electionLead'),
          value: 'isElectionLead',
          align: 'center',
          class: this.stickyHeaders,
        },
        {
          text: this.$t('userManagement.electionCommittee'),
          value: 'isInElectionCommittee',
          align: 'center',
          class: this.stickyHeaders,
        },
        {
          text: this.$t('userManagement.actions'),
          value: 'actions',
          align: 'center',
          sortable: false,
          class: this.stickyHeaders,
        },
      ];
    },
    stickyHeaders() {
      return `sticky-header ${
        this.isDarkTheme ? 'dark-background' : 'light-background'
      }`;
    },
    isDarkTheme() {
      return this.$vuetify.theme.isDark;
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
    getBooleanFieldName(field) {
      return `item.${field}`;
    },
    getFieldValue(props, field) {
      if (field === 'absent') {
        return !props.item[field];
      }

      return props.item[field];
    },
  },
  data() {
    return {
      search: '',
    };
  },
};
</script>
