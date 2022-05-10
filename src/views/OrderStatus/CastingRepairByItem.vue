<template>
  <v-container grid-list-xs>
    Hello World
    <v-btn @click="$router.push('/casting-repair-byorder')"> GoTO </v-btn>
  </v-container>
</template>

<script>
import apiOrder from "../../services/apiOrderStatus.js";

export default {
  name: "casting-repair-byitem",
  data() {
    return {
      orderNumber: "",
      betweenDate: {
        minDate: "",
        maxDate: "",
      },
    };
  },
  async mounted() {
    this.orderNumber = "CH-VI005/2022";
    this.betweenDate.minDate = "2022-01-01";
    this.betweenDate.maxDate = "2022-12-31";
    await this.loadData();
  },
  methods: {
    async loadData() {
      //to do
      const result = await apiOrder.castingRepairByItem(
        this.betweenDate,
        this.orderNumber
      );
      console.log(result);
    },
  },
};
</script>

<style>
</style>