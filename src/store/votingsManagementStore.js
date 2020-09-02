import votingsManagementService from '@/services/votingsManagementService';
import toasts from '@/utils/toasts';
import i18n from '../i18n';

const votingState = {
  isLoading: false,
  votings: null,
  alreadyVotedLists: null,
};

const actions = {
  loadVotings({ commit }) {
    commit('loading');
    votingsManagementService.getVotingsList().then(
      (votings) => commit('loadingSuccess', votings),
      () => {
        toasts.errorToast(i18n.tc('common.somethingWentWrong'));
        commit('failed');
      },
    );
  },
  // TODO: Maybe add some loading behaviour - perhaps use home loader
  addVoting(_, voting) {
    return votingsManagementService.addVoting(voting).then(
      () => {},
      () => {
        toasts.errorToast(i18n.tc('common.somethingWentWrong'));
        return Promise.reject();
      },
    );
  },
  editVoting(_, voting) {
    return votingsManagementService.editVoting(voting.id, voting).then(
      () => {},
      () => {
        toasts.errorToast(i18n.tc('common.somethingWentWrong'));
        return Promise.reject();
      },
    );
  },
  deleteVoting(_, votingId) {
    votingsManagementService.deleteVoting(votingId).then(
      () => {},
      () => {
        toasts.errorToast(i18n.tc('common.somethingWentWrong'));
      },
    );
  },
  openVoting(_, votingId) {
    votingsManagementService.openVoting(votingId).then(
      () => {},
      () => {
        toasts.errorToast(i18n.tc('common.somethingWentWrong'));
      },
    );
  },
  closeVoting(_, votingId) {
    votingsManagementService.closeVoting(votingId).then(
      () => {},
      () => {
        toasts.errorToast(i18n.tc('common.somethingWentWrong'));
      },
    );
  },
  // TODO: Make the file autodownload
  generateVotingReport(_, votingId) {
    votingsManagementService.generateVotingReport(votingId).then(
      () => {},
      () => {
        toasts.errorToast(i18n.tc('common.somethingWentWrong'));
      },
    );
  },
  /* eslint-disable implicit-arrow-linebreak */
  loadAlreadyVotedList({ commit }, votingId) {
    commit('loading');
    votingsManagementService.getAlreadyVotedList(votingId).then(
      (response) =>
        commit('loadingAlreadyVotedListSuccess', {
          alreadyVotedList: response.voters,
          votingId,
        }),
      () => {
        toasts.errorToast(i18n.tc('common.somethingWentWrong'));
        commit('loadingAlreadyVotedListFailed');
      },
    );
  },
  /* eslint-enable implicit-arrow-linebreak */
};

/* eslint-disable no-param-reassign */
const mutations = {
  loading(state) {
    state.isLoading = true;
  },
  loadingFinished(state) {
    state.isLoading = false;
  },
  loadingSuccess(state, votings) {
    state.isLoading = false;
    state.votings = votings;
  },
  failed(state) {
    state.isLoading = false;
    state.votings = null;
  },
  loadingAlreadyVotedListSuccess(state, params) {
    state.isLoading = false;
    if (state.alreadyVotedLists == null) {
      state.alreadyVotedLists = {};
    }

    state.alreadyVotedLists[`${params.votingId}`] = params.alreadyVotedList;
  },
  loadingAlreadyVotedListFailed(state) {
    state.isLoading = false;
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
