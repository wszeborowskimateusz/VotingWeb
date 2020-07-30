<template>
  <div>
    {{ $t(`sessionStatus.${status}.name`) }}
    <tooltip :modalName="modalName">
      <p>
        <span class="font-weight-bold"
          >{{ $t(`sessionStatus.${status}.name`) }} </span
        >-
        {{ $t(`sessionStatus.${status}.description`) }}
      </p>
    </tooltip>
  </div>
</template>

<script>
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
};
</script>
