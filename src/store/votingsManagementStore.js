import votingsManagementService from '@/services/votingsManagementService';
import toasts from '@/utils/toasts';
import i18n from '../i18n';

const getDefaultState = () => ({
  isLoading: false,
  votings: null,
  alreadyVotedLists: null,
});

const handleNotStartedAnd404Errors = (
  error,
  anotherErrorCheck = () => false,
) => {
  if (error.httpCode === 404 && error.errorCode === 'NO_VOTING') {
    toasts.errorToast(i18n.tc('errorMessages.votings.noVoting'));
  } else if (error.httpCode === 434 && error.errorCode === 'NOT_STARTED') {
    toasts.errorToast(i18n.tc('errorMessages.votings.votingNotStarted'));
  } else if (anotherErrorCheck(error)) {
    // handled by anotherErrorCheck
  } else {
    toasts.errorToast(i18n.tc('common.somethingWentWrong'));
  }
};

const votingState = getDefaultState();

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
  addVoting({ dispatch }, voting) {
    return votingsManagementService.addVoting(voting).then(
      () => dispatch('loadVotings'),
      () => {
        toasts.errorToast(i18n.tc('common.somethingWentWrong'));
        return Promise.reject();
      },
    );
  },
  editVoting({ dispatch }, voting) {
    return votingsManagementService.editVoting(voting.id, voting).then(
      () => dispatch('loadVotings'),
      (error) => {
        handleNotStartedAnd404Errors(error);
        return Promise.reject();
      },
    );
  },
  deleteVoting({ dispatch }, votingId) {
    votingsManagementService.deleteVoting(votingId).then(
      () => dispatch('loadVotings'),
      (error) => {
        handleNotStartedAnd404Errors(error);
      },
    );
  },
  openVoting({ dispatch }, votingId) {
    votingsManagementService.openVoting(votingId).then(
      () => dispatch('loadVotings'),
      (error) => {
        handleNotStartedAnd404Errors(error, (e) => {
          if (e.httpCode === 437 && e.errorCode === 'DURING_VOTING') {
            toasts.errorToast(
              i18n.tc('errorMessages.votings.anotherStartedVoting'),
            );
            return true;
          }
          return false;
        });
      },
    );
  },
  closeVoting({ dispatch }, votingId) {
    votingsManagementService.closeVoting(votingId).then(
      () => dispatch('loadVotings'),
      (error) => {
        if (error.httpCode === 404 && error.errorCode === 'NO_VOTING') {
          toasts.errorToast(i18n.tc('errorMessages.votings.noVoting'));
        } else if (
          error.httpCode === 434 &&
          error.errorCode === 'DURING_VOTING'
        ) {
          toasts.errorToast(i18n.tc('errorMessages.votings.notDuringVoting'));
        } else {
          toasts.errorToast(i18n.tc('common.somethingWentWrong'));
        }
      },
    );
  },
  // TODO: Make the file autodownload
  generateVotingReport(_, votingId) {
    votingsManagementService.generateVotingReport(votingId).then(
      () => {},
      (error) => {
        if (error.httpCode === 404 && error.errorCode === 'NO_VOTING') {
          toasts.errorToast(i18n.tc('errorMessages.votings.noVoting'));
        } else if (error.httpCode === 434 && error.errorCode === 'FINISHED') {
          toasts.errorToast(i18n.tc('errorMessages.votings.notFinished'));
        } else {
          toasts.errorToast(i18n.tc('common.somethingWentWrong'));
        }
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
      (error) => {
        if (error.httpCode === 404 && error.errorCode === 'NO_VOTING') {
          toasts.errorToast(i18n.tc('errorMessages.votings.noVoting'));
        } else {
          toasts.errorToast(i18n.tc('common.somethingWentWrong'));
        }

        commit('loadingAlreadyVotedListFailed');
      },
    );
  },
  resetState({ commit }) {
    commit('resetState');
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
  resetState(state) {
    Object.assign(state, getDefaultState());
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
