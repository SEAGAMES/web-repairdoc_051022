<template>
  <v-card id="stock_card" class="fontPrompt">
    <v-list-item two-line>
      <v-list-item-content>
        <v-list-item-title class="headline; mb-1; fontPrompt fontSize20" style="font">{{ title }}</v-list-item-title>
        <v-list-item-subtitle class="title; fontPrompt fontSize20" >{{ subtitle }}</v-list-item-subtitle>
      </v-list-item-content>

      <v-list-item-avatar tile size="80" :color="avatar_bg">
        <v-icon color="white"> {{avatar_ic}} </v-icon>
      </v-list-item-avatar>
    </v-list-item>
  </v-card>
</template>

<script>
export default {
  name: "StockCard",
  props: ["title", "subtitle", "avatar_bg", "avatar_ic"]
};
</script>

<style>
</style>