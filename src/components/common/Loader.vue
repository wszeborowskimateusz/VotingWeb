<template>
  <div v-if="isMainPageLoader" class="d-flex justify-content-center p-1">
    <vue-loaders-ball-beat color="gray"/>
  </div>
  <Spinner v-else />
</template>

<script>
import 'vue-loaders/dist/vue-loaders.css';
import VueLoadersBallBeat from 'vue-loaders/dist/loaders/ball-beat';

export default {
  name: 'Loader',
  components: {
    [VueLoadersBallBeat.component.name]: VueLoadersBallBeat.component,
  },
  props: {
    isMainPageLoader: {
      type: Boolean,
      default: () => true,
    },
  },
};
</script>
