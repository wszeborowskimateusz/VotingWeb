import Vue from 'vue';

import membersManagementService from '@/services/membersManagementService';
import toasts from '@/utils/toasts';
import i18n from '../i18n';

const membersState = { isLoading: false, members: {} };

const actions = {
  /* eslint-disable object-curly-newline */
  loadMembers(
    { commit, rootGetters, state },
    { sessionIdToLoad = null, takeStateFromCache = false } = {},
  ) {
    commit('loading');
    let activeSession = null;
    if (sessionIdToLoad == null) {
      activeSession = rootGetters['parliamentManagement/activeSession'];
    }

    if (sessionIdToLoad == null && activeSession == null) {
      commit('stopLoading');
      return;
    }

    const sessionId =
      sessionIdToLoad != null ? sessionIdToLoad : activeSession.id;

    if (takeStateFromCache && state.members[sessionId] != null) {
      commit('stopLoading');
      return;
    }

    membersManagementService.getVotersList(sessionId).then(
      (members) => commit('loadingSuccess', { members, sessionId }),
      () => {
        toasts.errorToast(i18n.tc('common.somethingWentWrong'));
        commit('failed');
      },
    );
  },
  changeVoterBlockStatus(_, { voterId, isBlocked }) {
    membersManagementService.changeVoterBlockStatus(voterId, isBlocked).then(
      () => {
        if (isBlocked) {
          toasts.successToast(i18n.tc('userManagement.userBlockSuccessfully'));
        } else {
          toasts.successToast(
            i18n.tc('userManagement.userUnBlockSuccessfully'),
          );
        }
      },
      () => toasts.errorToast(i18n.tc('common.somethingWentWrong')),
    );
  },
};

/* eslint-disable no-param-reassign */
const mutations = {
  loading(state) {
    state.isLoading = true;
  },
  loadingSuccess(state, { members, sessionId }) {
    state.isLoading = false;
    Vue.set(state.members, sessionId, members);
  },
  failed(state) {
    state.isLoading = false;
    state.sessionsMembers = null;
  },
  stopLoading(state) {
    state.isLoading = false;
  },
};
/* eslint-enable no-param-reassign */

export default {
  namespaced: true,
  state: membersState,
  actions,
  mutations,
  getters: {
    activeSessionMembers(state, _, __, rootGetters) {
      const activeSession = rootGetters['parliamentManagement/activeSession'];

      if (activeSession == null || state.members[activeSession.id] == null) {
        return [];
      }

      return state.members[activeSession.id];
    },
    electionLead(_, getters) {
      if (getters.activeSessionMembers == null) {
        return [];
      }

      const electionLead = getters.activeSessionMembers.find(
        (member) => member.isElectionLead,
      );

      return electionLead === undefined ? null : electionLead;
    },
    electionLeadById: (state) => (sessionId) => {
      const members = state.members[sessionId];
      if (members == null) {
        return [];
      }

      const electionLead = members.find((member) => member.isElectionLead);

      return electionLead === undefined ? null : electionLead;
    },
    electionCommittee(_, getters) {
      if (getters.activeSessionMembers == null) {
        return [];
      }
      return getters.activeSessionMembers.filter(
        (member) => member.isInElectionCommittee,
      );
    },
    presentVoters(_, getters) {
      if (getters.activeSessionMembers == null) {
        return [];
      }

      return getters.activeSessionMembers.filter(
        (member) => member.hasVote && !member.absent,
      );
    },
  },
};
