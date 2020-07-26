<template>
  <common-modal :name="modalName" :height="300">
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
      v-if="specificVotes != null"
      :headers="headers"
      :items="specificVotes"
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

      <template v-slot:no-data>
        {{ $t('userManagement.noResults') }}
      </template>

      <template v-slot:item.voteType="props">
        <v-img
          :src="imagesGetter.getImgUrl(getIcon(props.item.voteType))"
          height="25"
          width="25"
        />
      </template>
    </v-data-table>
  </common-modal>
</template>

<script>
import imagesGetter from '@/utils/imagesGetter';

export default {
  data() {
    return {
      imagesGetter,
      search: '',
      headers: [
        { text: this.$t('voting.vote'), value: 'voteType' },
        { text: this.$t('userManagement.fullName'), value: 'voter.name' },
        { text: this.$t('userManagement.index'), value: 'voter.index' },
      ],
    };
  },
  props: {
    modalName: {
      type: String,
      required: true,
    },
    specificVotes: {
      type: Array,
      required: true,
    },
  },
  methods: {
    getIcon(voteType) {
      if (voteType === 'FOR') return 'successful.svg';
      if (voteType === 'AGAINST') return 'unsuccessful.svg';
      if (voteType === 'HOLD') return 'hold.svg';

      return '';
    },
  },
};
</script>
