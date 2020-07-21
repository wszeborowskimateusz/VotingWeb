<template>
  <!--
    notVote: 1,
    specificVotes: [
    { voter: 0, voteType: 'HOLD' },
    { voter: 1, voteType: 'HOLD' },
    { voter: 1, voteType: 'FOR' },
    { voter: 1, voteType: 'FOR' },
    { voter: 1, voteType: 'FOR' },
    ],
-->
  <div class="p-2 d-flex flex-row" color="#1F7087">
    <slot></slot>
    <div :title="$t('voting.inFavor')">
      <v-img
        :src="imagesGetter.getImgUrl('successful.svg')"
        :height="20"
        :width="20"
      ></v-img
      >{{ results.inFavor }}
    </div>

    <div class="mx-5" :title="$t('voting.against')">
      <v-img
        :src="imagesGetter.getImgUrl('unsuccessful.svg')"
        :height="20"
        :width="20"
      ></v-img
      >{{ results.against }}
    </div>
    <div :title="$t('voting.hold')">
      <v-img
        :src="imagesGetter.getImgUrl('hold.svg')"
        :height="20"
        :width="20"
      ></v-img
      >{{ results.hold }}
    </div>
  </div>
</template>

<script>
import imagesGetter from '@/utils/imagesGetter';

export default {
  data() {
    return { imagesGetter };
  },
  props: {
    results: {
      type: Object,
      required: true,
    },
  },
};
</script>
