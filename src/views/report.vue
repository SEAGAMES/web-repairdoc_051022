<template>
  <v-container class="fontPrompt">
    <v-card >
      <v-btn class="success" @click="loadData()">Refresh</v-btn>
      <!-- <LineChart style="height: 300px;" :chartData="datacollection" /> -->
      <!-- <LineChart style="height: 300px;" /> -->
      <BarChart style="height: 300px;"  class="fontPrompt"/>
      <!-- <BarChart style="height: 300px;" :chartData="$store.getters.dataChartShow" /> -->
    </v-card>
  </v-container>
</template>

<script>
// import LineChart from "../components/charts/LineChart";
import BarChart from "../components/charts/BarChart.vue";
import api from "../services/api"

export default {
  components: {
    // LineChart,
    BarChart,
  },
  data() {
    return {
      datacollection: null,
      MonthChartReport: {
        MonthShow: [],
        ItQty: [],
        MaQty: []
      },
      
    };
  },
  async mounted() {
    this.$emit("isCheckLogin", !await api.isLoggedIn());
    this.loadData();
    this.fillData();
  },
  methods: {
    async loadData() {
      await this.$store.dispatch("reportChartBill");
      // let dataShow = []
      await this.$store.getters.ReportChartBillMonth.forEach(item => {
          this.MonthChartReport.MonthShow.push(item.NameMonth);
          this.MonthChartReport.ItQty.push(item.ItQty);
          this.MonthChartReport.MaQty.push(item.MaQty);
      });
      // console.log(this.MonthChartReport);

    },
    async fillData() {
      this.datacollection = {
        //Data to be represented on x-axis
        labels: this.MonthChartReport.MonthShow,
        datasets: [
          {
            label: "IT",
            pointBackgroundColor: "white",
            borderWidth: 1,
            pointBorderColor: "#A52A2A",
            data: this.MonthChartReport.ItQty,
            borderColor: ["#8A2BE2"],
            borderWidth: 2,
               backgroundColor: [
                'rgba(82, 244, 187, 0.5)',
                'rgba(82, 244, 187, 0.5)',
                'rgba(82, 244, 187, 0.5)',
                'rgba(82, 244, 187, 0.5)',
                'rgba(82, 244, 187, 0.5)',
                'rgba(82, 244, 187, 0.5)',
                 'rgba(82, 244, 187, 0.5)',
                'rgba(82, 244, 187, 0.5)',
                'rgba(82, 244, 187, 0.5)',
                'rgba(82, 244, 187, 0.5)',
                'rgba(82, 244, 187, 0.5)',
                'rgba(82, 244, 187, 0.5)'
            ],
          },
          {
            label: "MA",
            pointBackgroundColor: "white",
            borderWidth: 1,
            pointBorderColor: "#0000FF",
            data: this.MonthChartReport.MaQty,
            borderColor: ["#000000"],
            borderWidth: 2,
               backgroundColor: [
               'rgba(255, 206, 86, 1.2)',
                'rgba(255, 206, 86, 1.2)',
                'rgba(255, 206, 86, 1.2)',
                'rgba(255, 206, 86, 1.2)',
                'rgba(255, 206, 86, 1.2)',
                'rgba(255, 206, 86, 1.2)',
                'rgba(255, 206, 86, 1.2)',
                'rgba(255, 206, 86, 1.2)',
                'rgba(255, 206, 86, 1.2)',
                'rgba(255, 206, 86, 1.2)',
                'rgba(255, 206, 86, 1.2)',
                'rgba(255, 206, 86, 1.2)'
            ],
          },
        ],
        

      };
      await this.$store.dispatch({type: "setDataChartShow", data: this.datacollection});
    },
    async refreshChart() {
      await this.loadData(),
      await this.fillData();
    }
  },
};
</script>

<style>
.small {
  max-width: 600px;
  margin: 150px auto;
}
</style>