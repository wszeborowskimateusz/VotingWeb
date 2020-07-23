import votingsManagementService from '@/services/votingsManagementService';
import toasts from '@/utils/toasts';
import i18n from '../i18n';

const votingState = { isLoading: false, votings: null };

const actions = {
  loadVotings({ commit }) {
    commit('loading');
    votingsManagementService.getVotingsList().then(
      (votings) => commit('loadingSuccess', votings),
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
  loadingSuccess(state, votings) {
    state.isLoading = false;
    state.votings = votings;
  },
  failed(state) {
    state.isLoading = false;
    state.votings = null;
  },
};
/* eslint-enable no-param-reassign */

export default {
  namespaced: true,
  state: votingState,
  actions,
  mutations,
  getters: {
    beforeVoting(state) {
      if (state.votings == null) {
        return [];
      }
      return state.votings.filter((voting) => voting.status === 'NOT_STARTED');
    },
    duringVoting(state) {
      if (state.votings == null) {
        return [];
      }
      return state.votings.filter(
        (voting) => voting.status === 'DURING_VOTING',
      );
    },
    finished(state) {
      if (state.votings == null) {
        return [];
      }
      return state.votings.filter((voting) => voting.status === 'FINISHED');
    },
  },
};
