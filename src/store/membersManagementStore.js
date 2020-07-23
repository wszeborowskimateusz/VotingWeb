import membersManagementService from '@/services/membersManagementService';
import toasts from '@/utils/toasts';
import i18n from '../i18n';

const membersState = { isLoading: false, members: [] };

const actions = {
  loadMembers({ commit }) {
    commit('loading');
    membersManagementService.getVotersList().then(
      (members) => commit('loadingSuccess', members),
      (error) => {
        toasts.errorToast(`${error}. ${i18n.tc('common.tryAgain')}`);
        commit('failed');
      },
    );
  },
};

/* eslint-disable no-param-reassign */
const mutations = {
  loading(state) {
    state.isLoading = true;
  },
  loadingSuccess(state, members) {
    state.isLoading = false;
    state.members = members;
  },
  failed(state) {
    state.isLoading = false;
    state.members = null;
  },
};
/* eslint-enable no-param-reassign */

export default {
  namespaced: true,
  state: membersState,
  actions,
  mutations,
  getters: {
    electionLead(state) {
      if (state.members == null) {
        return [];
      }

      const electionLead = state.members.find(
        (member) => member.isElectionLead,
      );

      return electionLead === undefined ? null : electionLead;
    },
    electionCommittee(state) {
      if (state.members == null) {
        return [];
      }
      return state.members.filter((member) => member.isInElectionCommittee);
    },
  },
};
