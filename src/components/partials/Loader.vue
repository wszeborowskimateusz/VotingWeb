<template>
  <div v-if="isMainPageLoader" class="d-flex justify-content-center pt-5 p-1">
    <Spinner />
  </div>
  <Spinner v-else />
</template>

<script>
import Spinner from 'vue-loading-spinner/src/components/Circle4.vue';

export default {
  components: { Spinner },
  props: {
    isMainPageLoader: {
      type: Boolean,
      default: () => true,
    },
  },
};
</script>
