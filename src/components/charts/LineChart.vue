<script>
import { Line, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;
export default {
  extends: Line,
  mixins: [reactiveProp],
  props: ["chartData"],
  data() {
    return {
      options: {
        //ล็อคความสูงของ Chart
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false,
        },
      },
    };
  },
  mounted() {
    this.renderChart(this.chartData, this.options);
  },
};
</script>