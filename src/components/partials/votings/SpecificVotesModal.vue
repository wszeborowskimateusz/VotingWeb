<template>
  <common-modal :name="modalName" :height="300">
    <v-virtual-scroll
      :bench="10"
      :items="specificVotes"
      height="300"
      item-height="64"
    >
      <template v-slot="{ item }">
        <v-list-item :key="item"       class="mr-5">
          <v-list-item-action>
            <v-img
              :src="imagesGetter.getImgUrl(getIcon(item.voteType))"
              height="25"
              width="25"
            />
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>
              {{ item.voter.name }}
            </v-list-item-title>
          </v-list-item-content>

          <v-list-item-action>
            {{ item.voter.index }}
          </v-list-item-action>
        </v-list-item>

        <v-divider></v-divider>
      </template>
    </v-virtual-scroll>
  </common-modal>
</template>

<script>
import imagesGetter from '@/utils/imagesGetter';

export default {
  data() {
    return {
      imagesGetter,
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
