<template>
    <v-app-bar
    app 
    color="#b0beD5" 
    dense 
    dark 
    >
      <!-- <v-app-bar-nav-icon @click="$store.state.menuShow = !$store.state.menuShow" icon="menu" ></v-app-bar-nav-icon> -->
      <v-app-bar-nav-icon @click="$store.state.menuShow = !$store.state.menuShow" ><v-icon class="ml-2 mr-2">menu</v-icon></v-app-bar-nav-icon>

      <v-toolbar-title class="fontPrompt">Artevent WebApplication {{ version }}</v-toolbar-title>

      <v-spacer></v-spacer>

      <span class="fontPrompt">{{$store.getters.fullName + ' ( '+$store.getters.policyName+' ) '}}</span>
      <v-btn icon @click="onClickLogOff()">
        <v-icon >logout</v-icon>
      </v-btn>
    </v-app-bar>
</template>

<script>
export default {
  computed: {
    version() {
      return "1.5"
    }
  },
  methods: {
    async onClickLogOff() {
     await this.$store.dispatch("doLogout");
    }
  }
};
</script>

<style>
</style>