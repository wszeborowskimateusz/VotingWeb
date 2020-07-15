<template>
  <CommonModal :name="name" :height="300" :width="300">
    <div
      class="p-2 pt-4 d-flex justify-content-center align-items-center h-100"
    >
      <p>
        <span class="font-weight-bold"
          >{{ $t(`sessionStatus.${status}.name`) }} </span
        >-
        {{ $t(`sessionStatus.${status}.description`) }}
      </p>
    </div>
  </CommonModal>
</template>
<script>
import CommonModal from './CommonModal.vue';

export default {
  props: {
    status: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: false,
      default: () => 'sessionStatusInfoModal',
    },
  },
  components: {
    CommonModal,
  },
};
</script>
