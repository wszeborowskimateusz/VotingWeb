<template>
  <div>
    {{ $t(`sessionStatus.${status}.name`) }}
    <a @click="$modal.show(modalName)" style="cursor:pointer">
      <i class="fas fa-info-circle"></i>
    </a>
    <SessionStatusInfoModal
      :status="status"
      :name="modalName"
    />
  </div>
</template>

<script>
import SessionStatusInfoModal from './SessionStatusInfoModal.vue';

export default {
  props: {
    status: {
      type: String,
      required: true,
    },
    modalName: {
      type: String,
      required: true,
    },
  },
  components: {
    SessionStatusInfoModal,
  },
};
</script>
