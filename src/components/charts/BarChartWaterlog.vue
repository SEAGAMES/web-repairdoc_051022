<script>
//Importing Bar class from the vue-chartjs wrapper
import { Bar, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;
// import ChartJsPluginDataLabels from 'chartjs-plugin-datalabels'
// import Chart from 'chart.js'
//Exporting this so it can be used in other components

export default {
  extends: Bar,
  mixins: [reactiveProp],
  data() {
    return {
      //Chart.js options that controls the appearance of the chart
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
              gridLines: {
                display: true,
              },
            },
          ],
          xAxes: [
            {
              gridLines: {
                display: false,
              },
            },
          ],
        },
        legend: {
          display: true,
        },
        responsive: true,
        maintainAspectRatio: false,
      },
      //  plugins: {
      //     afterDatasetsDraw: function (context, easing) {
      //       var ctx = context.chart.ctx;
      //       context.data.datasets.forEach(function (dataset) {
      //         for (var i = 0; i < dataset.data.length; i++) {
      //           console.log('LLL',dataset.data[i])
      //           if (dataset.data[i] != 0) {
      //             var model =
      //               dataset._meta[Object.keys(dataset._meta)[0]].data[i]._model;
      //             var textY = model.y + (dataset.type == "line" ? -3 : 15);

      //             ctx.font = Chart.helpers.fontString(
      //               Chart.defaults.global.defaultFontSize,
      //               "normal",
      //               Chart.defaults.global.defaultFontFamily
      //             );
      //             ctx.textAlign = "start";
      //             ctx.textBaseline = "middle";
      //             ctx.fillStyle = dataset.type == "line" ? "black" : "black";
      //             ctx.save();
      //             ctx.translate(model.x, textY - 15);
      //             ctx.rotate(4.7);
      //             ctx.fillText(dataset.data[i], 0, 0);
      //             ctx.restore();
      //           }
      //         }
      //       });
      //     },
      //   },
    };
  },
  async mounted() {
    await this.renderChart(this.chartData, this.options);
    // console.log('ทำงาน');
  },
};
</script>