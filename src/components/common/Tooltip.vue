<template>
  <div class="d-inline">
    <a @click="$modal.show(modalName)" style="cursor:pointer">
      <i class="fas fa-info-circle"></i>
    </a>
    <common-modal :name="modalName" :height="300">
      <div
        class="p-3 pt-4 d-flex justify-content-center align-items-center h-100"
      >
        <slot></slot>
      </div>
    </common-modal>
  </div>
</template>

<script>
export default {
  name: 'Tooltip',
  props: {
    modalName: {
      type: String,
      required: true,
    },
  },
};
</script>
