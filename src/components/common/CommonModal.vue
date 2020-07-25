<template>
  <modal
    :name="name"
    :height="height"
    @before-close="beforeClose"
    @before-open="beforeOpen"
    :adaptive="true"
    :max-width="700"
    :styles="{ 'background-color': $vuetify.theme.isDark ? '#121212' : '' }"
  >
    <a @click="close()" class="close-button">
      <i class="fas fa-times"></i>
    </a>

    <div class="limit-height h-100">
      <slot></slot>
    </div>
  </modal>
</template>

<style scoped>
.close-button {
  position: absolute;
  right: 20px;
  top: 10px;
  cursor: pointer;
  z-index: 9999;
}

.limit-height {
  max-height: 85vh;
  overflow: auto;
}
</style>

<script>
export default {
  name: 'CommonModal',
  props: {
    name: {
      type: String,
      required: true,
    },
    height: {
      type: [Number, String],
      required: false,
      default: () => 'auto',
    },
  },
  methods: {
    close() {
      this.$modal.hide(this.name);
    },
    beforeClose() {
      this.$emit('before-close');
    },
    beforeOpen(params) {
      this.$emit('before-open', params);
    },
  },
};
</script>
