<template>
  <v-app>
    <div v-if="$store.state.loadingPage">
      <PulseLoader
        justify="center"
        align="center"
        :loading="$store.state.loadingPage"
        class="mt-16"
      />
    </div>
    <router-view></router-view>
  </v-app>
</template>

<script>
import PulseLoader from "../components/Loadings/PulseLoader.vue";

export default {
  name: "facwipstatus",
  components: {
    PulseLoader,
  },
};
</script>

<style>
</style>