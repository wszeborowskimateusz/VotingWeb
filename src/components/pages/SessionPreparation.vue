<template>
  <div v-if="activeSession == null">
    TODO: Handle Mistake ?
  </div>
  <div
    v-else-if="activeSession.status === 'IN_PREPARTION'"
    class="justify-content-center d-flex flex-column"
  >
    <div>
      <img
        class="image mb-5 rounded"
        :src="imagesGetter.getImgUrl('in_preparation.jpg')"
      />
    </div>
    <div class="flex-row d-flex justify-content-center">
      <button class="btn btn-primary mx-3 shadow">
        <i class="far fa-file-archive mr-1"></i
        >{{ $t('sessionActions.generatePasswords') }}
      </button>
      <button class="btn btn-success mx-3 shadow">
        <i class="fas fa-play-circle mr-1"></i>{{ $t('sessionActions.start') }}
      </button>
    </div>
  </div>
  <div v-else>
    <h3 class="mb-5">{{ $t('session.enterCommitee') }}</h3>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label>{{ $t('session.electionLead') }}</label>
        <multiselect
          v-model="electionLead"
          :options="users"
          :searchable="true"
          :close-on-select="true"
          :show-labels="false"
          :placeholder="$t('session.pickElectionLead')"
        >
          <template v-slot:noResult>
            {{ $t('session.noUserFound') }}
          </template>
        </multiselect>
        <div
          v-show="submitted && !electionLead"
          class="invalid-feedback display"
        >
          {{ $t(`session.electionLeadIsRequired`) }}
        </div>
      </div>
      <div class="form-group">
        <label>{{ $t('session.committeeMembers') }}</label>
        <multiselect
          v-model="committee"
          :options="usersWithoutElectionLead"
          :searchable="true"
          :close-on-select="false"
          :show-labels="false"
          :multiple="true"
          :placeholder="$t('session.pickCommitteeMembers')"
        >
          <template v-slot:noResult>
            {{ $t('session.noUserFound') }}
          </template></multiselect
        >
        <div
          v-show="submitted && !isCommitteeBigEnough"
          class="invalid-feedback display"
        >
          {{
            $t(`session.committeeAtLeastMembers`, {
              amount: minimalNumberOfMembers,
            })
          }}
        </div>
      </div>
      <div class="flex-row d-flex justify-content-center mt-5">
        <button class="btn btn-primary mx-3 shadow" type="button">
          <i class="far fa-file-archive mr-1"></i
          >{{ $t('sessionActions.generatePasswords') }}
        </button>
        <button class="btn btn-success mx-3 shadow" type="submit">
          <i class="fas fa-play-circle mr-1"></i
          >{{ $t('sessionActions.goToVotings') }}
        </button>
      </div>
    </form>
  </div>
</template>
<style scoped>
.image {
  width: 100%;
  max-width: 700px;
}

.display {
  display: block;
}
</style>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<script>
import { mapGetters } from 'vuex';
import Multiselect from 'vue-multiselect';
import imagesGetter from '../../utils/imagesGetter';

export default {
  name: 'SessionPreparation',
  data() {
    return {
      imagesGetter,
      minimalNumberOfMembers: 4,
      submitted: false,
      electionLead: '',
      committee: [],
      users: [
        'Marta Kurek',
        'Robert Biedroń',
        'Andrzej Duda',
        'Rafał Trzaskowski',
        'Szymon Hołownia',
        'Krzysztof Bosak',
        'Robert Kubica',
        'Stanisław Żółtek',
      ],
    };
  },
  computed: {
    ...mapGetters('parliamentManagement', ['activeSession']),
    usersWithoutElectionLead() {
      return this.users.filter((user) => user !== this.electionLead);
    },
    isCommitteeBigEnough() {
      return this.committee.length >= this.minimalNumberOfMembers;
    },
  },
  methods: {
    handleSubmit() {
      this.submitted = true;
    },
  },
  components: {
    Multiselect,
  },
};
</script>
