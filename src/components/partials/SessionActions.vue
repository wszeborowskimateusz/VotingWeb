<template>
  <div class="ml-md-auto mr-2 my-4 my-md-0 mx-auto mx-md-2">
    <div v-if="status === 'IN_PREPARTION'">
      <button class="btn btn-info mr-2">
        <i class="far fa-play-circle mr-1"></i>{{ $t('sessionActions.start') }}
      </button>
    </div>
    <div v-if="status === 'BEFORE_VOTING'"></div>
    <div v-if="status === 'IN_PROGRESS'">
      <button class="btn btn-info mr-2">
        <i class="far fa-pause-circle mr-1"></i
        >{{ $t('sessionActions.suspend') }}
      </button>
      <button class="btn btn-info">
        <i class="far fa-stop-circle mr-1"></i>{{ $t('sessionActions.finish') }}
      </button>
    </div>
    <div v-if="status === 'SUSPENDED'">
      <button class="btn btn-info">
        <i class="far fa-arrow-alt-circle-right mr-1"></i
        >{{ $t('sessionActions.resume') }}
      </button>
    </div>
    <div v-if="status === 'FINISHED'"></div>
    <div v-if="status === 'FINISHED_NOT_SAVED_TO_GLOBAL'">
      <button class="btn btn-info">
        <i class="far fa-save mr-1"></i>{{ $t('sessionActions.saveToGlobal') }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    status: {
      type: String,
      required: true,
    },
  },
};
</script>
