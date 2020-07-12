<template>
  <modal name="sessionStatusInfoModal" :height="300" :width="300">
    <a @click="close()" class="close-button">
      <i class="fas fa-times"></i>
    </a>
    <div class="p-2 pt-4 d-flex justify-content-center align-items-center h-100">
      <p>
        <span class="font-weight-bold">{{
          $t(`sessionStatus.${status}.name`)
        }} </span>-
        {{ $t(`sessionStatus.${status}.description`) }}
      </p>
    </div>
  </modal>
</template>
<style scoped>
.close-button {
  position: absolute;
  right: 10px;
  top: 5px;
}
</style>
<script>
export default {
  props: ['status'],
  methods: {
    close() {
      this.$modal.hide('sessionStatusInfoModal');
    },
  },
};
</script>
