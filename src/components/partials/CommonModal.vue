<template>
  <modal
    :name="name"
    :height="height"
    @before-close="beforeClose"
    :adaptive="true"
    :max-width="700"
  >
    <a @click="close()" class="close-button">
      <i class="fas fa-times"></i>
    </a>
    <slot></slot>
  </modal>
</template>

<style scoped>
.close-button {
  position: absolute;
  right: 10px;
  top: 5px;
  cursor: pointer;
}
</style>

<script>
export default {
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
  },
};
</script>
