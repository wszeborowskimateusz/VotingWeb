<template>
  <v-container>
    <h2 class="mb-5">{{ votingName }}</h2>
    <div class="d-flex justify-content-center mb-2">
      <div class="d-flex flex-column">
        <div class="d-flex">
          <div
            class="rounded mr-2"
            style="background-color: #03A9F4; height: 20px; width: 20px;"
          />
          {{ $t('voting.alreadyVoted') }}
        </div>

        <div class="d-flex">
          <div
            class="rounded mr-2"
            style="background-color: #FF9800; height: 20px; width: 20px;"
          />
          {{ $t('voting.notVotedYet') }}
        </div>
      </div>
    </div>

    <v-row class="fill-height" align="center" justify="center">
      <template v-for="(user, i) in users">
        <v-col :key="i" cols="12" md="2">
          <v-hover v-slot:default="{ hover }">
            <v-card
              :elevation="hover ? 12 : 2"
              :class="{ 'on-hover': hover }"
              :style="{
                'background-color': user.didVote ? '#03A9F4' : '#FF9800',
              }"
            >
              <v-card-title class="title ml-2">
                <v-row class="fill-height flex-column" justify="space-between">
                  <p class="mt-4 subheading text-left">{{ user.name }}</p>

                  <p class="ma-0 body-1 font-weight-bold font-italic text-left">
                    {{ $t('voting.indexNumber') }}:{{ user.index }}
                  </p>
                </v-row>
              </v-card-title>
            </v-card>
          </v-hover>
        </v-col>
      </template>
    </v-row>
  </v-container>
</template>

<style scoped>
.v-card {
  transition: opacity 0.4s ease-in-out;
}

.v-card:not(.on-hover) {
  opacity: 0.8;
}
</style>

<script>
export default {
  data() {
    return {
      votingName: 'Głosowanie nad kandydaturą Roberta Kubicy na szefa',
      users: [
        { name: 'Jon Snow', index: '163524', didVote: false },
        { name: 'Jon Snow', index: '231231', didVote: true },
        { name: 'Jon Snow', index: '234234', didVote: false },
        { name: 'Jon Snow', index: '765565', didVote: false },
        { name: 'Jon Snow', index: '234565', didVote: true },
        { name: 'Jon Snow', index: '123234', didVote: false },
        { name: 'Jon Snow', index: '534534', didVote: false },
        { name: 'Jon Snow', index: '456453', didVote: true },
        { name: 'Jon Snow', index: '123456', didVote: false },
        { name: 'Jon Snow', index: '312355', didVote: true },
        { name: 'Jon Snow', index: '312335', didVote: true },
        { name: 'Jon Snow', index: '765756', didVote: true },
        { name: 'Jon Snow', index: '323556', didVote: true },
        { name: 'Jon Snow', index: '554345', didVote: false },
        { name: 'Jon Snow', index: '456456', didVote: true },
        { name: 'Jon Snow', index: '344534', didVote: false },
      ],
    };
  },
  computed: {
    voted() {
      return this.users.filter((user) => user.didVote);
    },
    notVoted() {
      return this.users.filter((user) => !user.didVote);
    },
  },
};
</script>
