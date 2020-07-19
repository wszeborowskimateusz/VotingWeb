<template>
  <div>
    <h3 class="mb-3">{{$t('voting.votingsList')}}</h3>
    <v-row justify="center">
      <v-expansion-panels :focusable="true">
        <v-expansion-panel v-for="(item, i) in 5" :key="i">
          <v-expansion-panel-header
            ><div class="flex-fill">Item</div></v-expansion-panel-header
          >
          <v-expansion-panel-content>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      votingsList: [{}],
    };
  },
};
</script>
