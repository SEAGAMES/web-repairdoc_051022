<template>
  <v-container
    grid-list-xs
    class="fontSarabun"
    v-if="!$store.state.loadingPage"
  >
    <!-- Header Report -->
    <v-row class="mt-1">
      <!-- โดนัท1 -->
      <v-col lg="4" md="6" sm="12" cols="12">
        <v-card height="245">
          <v-row>
            <v-col>
              <div class="text-center mt-n2 fontSize20 fontPrompt">
                <b>สรุปงานรวมทั้ง Fac</b>
              </div>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="6" lg="6" md="12" sm="12" class="mt-n5">
              <Doughnut
                v-if="isShowChart"
                :chart-data="dataDoughnut1"
                :options="options"
                style="height: 200px"
              />
              <!-- :style="windowWidth >= 1920 ? 'height: 200px' : 'height: 150px'" -->
            </v-col>
            <!-- style="height: 200px" -->
            <v-col
              cols="6"
              lg="6"
              md="12"
              sm="12"
              :class="windowWidth >= 1920 ? 'fontSize14' : 'fontSize12'"
            >
              <v-row>
                <v-col cols="5">
                  <div class="text-left">งานทั้ง Fac :</div>
                </v-col>
                <v-col cols="4">
                  <div class="text-center">
                    {{ dataChart.doughnut1.TotalQty.toLocaleString() }}
                  </div>
                </v-col>
                <v-col cols="3" class="">
                  <div class="text-left">ชิ้น</div>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="5" class="">
                  <div class="text-left">กำลังผลิต :</div>
                </v-col>
                <v-col cols="4">
                  <div class="text-center">
                    {{
                      (
                        dataChart.doughnut1.TotalQty -
                        dataChart.doughnut1.TotalQA
                      ).toLocaleString()
                    }}
                  </div>
                </v-col>
                <v-col cols="3" class="">
                  <div class="text-left">ชิ้น</div>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="5" class="">
                  <div class="text-left">ส่ง QA :</div>
                </v-col>
                <v-col cols="4">
                  <div class="text-center">
                    {{ dataChart.doughnut1.TotalQA.toLocaleString() }}
                  </div>
                </v-col>
                <v-col cols="3" class="">
                  <div class="text-left">ชิ้น</div>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card>
      </v-col>

      <!-- โดนัท2 -->
      <v-col lg="4" md="6" sm="12" cols="12">
        <v-card height="245">
          <v-row>
            <v-col cols="6" class="mt-n5">
              <v-row>
                <v-col>
                  <div class="text-center mt-2 fontSize20 fontPrompt">
                    <b>สรุปงานแต่ละแผนก</b>
                  </div>
                </v-col>
              </v-row>

              <v-row class="mt-n5">
                <v-col>
                  <Doughnut
                    v-if="isShowChart"
                    :chart-data="dataDoughnut2"
                    :options="options"
                    style="height: 200px"
                  />
                </v-col>
              </v-row>
            </v-col>
            <v-col
              cols="6"
              :class="windowWidth >= 1920 ? 'fontSize14' : 'fontSize12'"
            >
              <v-row>
                <v-col cols="4">
                  <div class="text-left">เทียน :</div>
                </v-col>
                <v-col cols="4">
                  <div class="text-center">
                    {{ dataChart.doughnut2.totalWax.toLocaleString() }}
                  </div>
                </v-col>
                <v-col cols="3" class="">
                  <div class="text-left">ชิ้น</div>
                </v-col>
              </v-row>
              <v-row class="mt-n5">
                <v-col cols="4" class="">
                  <div class="text-left">หล่อ :</div>
                </v-col>
                <v-col cols="4">
                  <div class="text-center">
                    {{ dataChart.doughnut2.totalCasting.toLocaleString() }}
                  </div>
                </v-col>
                <v-col cols="3" class="">
                  <div class="text-left">ชิ้น</div>
                </v-col>
              </v-row>

              <!-- แต่ง -->
              <v-row class="mt-n5">
                <v-col cols="4" class="">
                  <div class="text-left">แต่ง :</div>
                </v-col>
                <v-col cols="4">
                  <div class="text-center">
                    {{ dataChart.doughnut2.totalFiling.toLocaleString() }}
                  </div>
                </v-col>
                <v-col cols="3" class="">
                  <div class="text-left">ชิ้น</div>
                </v-col>
              </v-row>

              <!-- PMG -->
              <v-row class="mt-n5">
                <v-col cols="4" class="">
                  <div class="text-left">PMG :</div>
                </v-col>
                <v-col cols="4">
                  <div class="text-center">
                    {{ dataChart.doughnut2.totalPMG.toLocaleString() }}
                  </div>
                </v-col>
                <v-col cols="3" class="">
                  <div class="text-left">ชิ้น</div>
                </v-col>
              </v-row>

              <!-- Sup นอก -->
              <v-row class="mt-n5">
                <v-col cols="4" class="">
                  <div class="text-left">Supนอก :</div>
                </v-col>
                <v-col cols="4">
                  <div class="text-center">
                    {{ dataChart.doughnut2.totalSup.toLocaleString() }}
                  </div>
                </v-col>
                <v-col cols="3" class="">
                  <div class="text-left">ชิ้น</div>
                </v-col>
              </v-row>

              <!-- ฝัง -->
              <v-row class="mt-n5">
                <v-col cols="4" class="">
                  <div class="text-left">ฝัง :</div>
                </v-col>
                <v-col cols="4">
                  <div class="text-center">
                    {{ dataChart.doughnut2.totalSetting.toLocaleString() }}
                  </div>
                </v-col>
                <v-col cols="3" class="">
                  <div class="text-left">ชิ้น</div>
                </v-col>
              </v-row>

              <!-- ขัด -->
              <v-row class="mt-n5">
                <v-col cols="4" class="">
                  <div class="text-left">ขัด :</div>
                </v-col>
                <v-col cols="4">
                  <div class="text-center">
                    {{ dataChart.doughnut2.totalPoslishing.toLocaleString() }}
                  </div>
                </v-col>
                <v-col cols="3" class="">
                  <div class="text-left">ชิ้น</div>
                </v-col>
              </v-row>

              <!-- ชุบ -->
              <v-row class="mt-n5">
                <v-col cols="4" class="">
                  <div class="text-left">ชุบ :</div>
                </v-col>
                <v-col cols="4">
                  <div class="text-center">
                    {{ dataChart.doughnut2.totalPlating.toLocaleString() }}
                  </div>
                </v-col>
                <v-col cols="3" class="">
                  <div class="text-left">ชิ้น</div>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card>
      </v-col>

      <!-- LineChart -->
      <v-col lg="4" md="12" sm="12" cols="12" class="fontPrompt">
        <v-card height="245">
          <v-row>
            <v-col>
              <div class="text-center mt-n2 fontSize20">
                <b>ยอดส่ง QA ในสัปดาห์นี้</b>
              </div>
            </v-col>
          </v-row>
          <v-row class="mt-n5">
            <v-col>
              <LineChart
                v-if="isShowChart"
                :chart-data="dataLineChart"
                :options="options"
                style="height: 200px"
              />
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <!-- DATATABLE -->
    <v-card class="fontSarabun mt-10">
      <v-data-table
        :search="dataFilter.search"
        :headers="headers"
        :items="orderStatus"
        :items-per-page="15"
        class="elevation-1 myMppOrderStatus"
      >
        <!-- แถบFilter -->
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title class="fontSize14"
              >FACTORY {{ $store.getters.Factory }}</v-toolbar-title
            >
            <v-divider class="mx-4" inset vertical></v-divider>
            <!-- ค้นหาจากชือ Order -->
            <v-text-field
              v-model="dataFilter.search"
              append-icon="search"
              label="ค้นหาจากชื่อ Order"
              single-line
              hide-details
              outlined
              dense
            ></v-text-field>
            <v-spacer></v-spacer>

            <!-- ค้นหาจากวันกำหนดส่ง-->
            <v-text-field
              label="ค้นหาจากวันกำหนดส่ง"
              v-model="dataFilter.valuesShowFilterDuedate"
              outlined
              hide-details
              color="grey"
              readonly
              append-icon="mdi-calendar-month"
              dense
              @click="dataFilter.showDatePicker = true"
            />
            <v-spacer></v-spacer>

            <!-- ค้นหาจาก Sales -->
            <v-select
              label="ค้นหาจากSales"
              outlined
              dense
              hide-details
              :items="dataFilter.dataSalesFilter"
              item-text="SalesManager"
              item-value="SalesManager"
              v-model="dataFilter.valuesFilterSales"
              append-icon="mdi-human"
              @change="filterAll()"
              multiple
              clearable
            />
            <v-spacer></v-spacer>
            <!-- ค้นหาจากสถานการณ์ -->
            <v-select
              label="ค้นหาจากสถานการณ์"
              outlined
              dense
              hide-details
              :items="dataFilter.dataStatusFilter"
              item-text="statusName"
              item-value="statusName"
              v-model="dataFilter.valuesFilterStatus"
              append-icon="mdi-hubspot"
              @change="filterAll()"
              multiple
              clearable
            />
            <v-spacer></v-spacer>
            <!-- ล้างการค้นหา -->
            <v-btn
              color="red"
              width="85"
              height="40"
              @click="clearFilter()"
              outlined
            >
              <div class="fontSize12">ล้างการค้นหา</div>
            </v-btn>
            <v-spacer></v-spacer>
          </v-toolbar>
        </template>

        <template v-slot:item="{ item }">
          <!-- <tr class="color: grey and myImg"> v-bind:class="{ active: isActive, 'text-danger': hasError }" -->
          <tr height="60">
            <td @click="goDetail(item)" align="left" justify="center">
              <span class="fontSize13">{{ item.SalesManager }}</span>
            </td>
            <td @click="goDetail(item)" width="200">
              <span class="fontSize13"> {{ item.OrderNumber }}</span>
            </td>

            <td
              @click="goDetail(item)"
              align="center"
              justify="center"
              width="150"
            >
              <span class="fontSize13"
                >({{ item.thaiDate }})_{{
                  item.DueDate | moment("DD/MM/YYYY")
                }}</span
              >
            </td>

            <td @click="goDetail(item)" align="center" justify="center">
              <span class="fontSize13">{{
                item.TotalQty.toLocaleString()
              }}</span>
            </td>

            <!-- { text: "จำนวน เทียน"} -->
            <td
              align="center"
              justify="center"
              width="10"
              @click="goDetail(item)"
            >
              <v-chip
                dark
                v-bind:class="{
                  red: item.P4 > 0,
                  white: item.P4 <= 0,
                }"
              >
                <span class="fontSize13 text-xs-right">{{ item.P4 }}</span>
              </v-chip>
            </td>

            <!-- { text: "จำนวน หล่อ"} -->
            <td
              align="center"
              justify="center"
              width="10"
              @click="goDetail(item)"
            >
              <v-chip
                dark
                v-bind:class="{
                  red: item.P5 > 0,
                  white: item.P5 <= 0,
                }"
              >
                <span class="fontSize13 text-xs-right">{{ item.P5 }}</span>
              </v-chip>
            </td>

            <!-- { text: "จำนวน แต่ง"} -->
            <td
              align="center"
              justify="center"
              width="10"
              @click="goDetail(item)"
            >
              <v-chip
                dark
                v-bind:class="{
                  orange: item.P8 > 0,
                  white: item.P8 <= 0,
                }"
              >
                <span class="fontSize13 text-xs-right">{{ item.P8 }}</span>
              </v-chip>
            </td>

            <!-- { text: "จำนวน Supนอก"} -->
            <td
              align="center"
              justify="center"
              width="10"
              @click="goDetail(item)"
            >
              <v-chip
                dark
                v-bind:class="{
                  orange: item.P7 > 0,
                  white: item.P7 <= 0,
                }"
              >
                <span class="fontSize13 text-xs-right"> {{ item.P7 }}</span>
              </v-chip>
            </td>

            <!-- { text: "จำนวน PMG"} -->
            <td
              align="center"
              justify="center"
              width="10"
              @click="goDetail(item)"
            >
              <v-chip
                dark
                v-bind:class="{
                  orange: item.P6 > 0,
                  white: item.P6 <= 0,
                }"
              >
                <span class="fontSize13 text-xs-right">{{ item.P6 }}</span>
              </v-chip>
            </td>

            <!-- { text: "จำนวน ฝัง"} -->
            <td
              align="center"
              justify="center"
              width="10"
              @click="goDetail(item)"
            >
              <v-chip
                dark
                v-bind:class="{
                  orange: item.P9 > 0,
                  white: item.P9 <= 0,
                }"
              >
                <span class="fontSize13 text-xs-right">{{ item.P9 }}</span>
              </v-chip>
            </td>

            <!-- { text: "จำนวน ขัด"} -->
            <td
              align="center"
              justify="center"
              width="10"
              @click="goDetail(item)"
            >
              <v-chip
                dark
                v-bind:class="{
                  orange: item.P10 > 0,
                  white: item.P10 <= 0,
                }"
              >
                <span class="fontSize13 text-xs-right">{{ item.P10 }}</span>
              </v-chip>
            </td>

            <!-- { text: "จำนวน ชุบ"} -->
            <td
              align="center"
              justify="center"
              width="10"
              @click="goDetail(item)"
            >
              <v-chip
                dark
                v-bind:class="{
                  green: item.P11 > 0,
                  white: item.P11 <= 0,
                }"
              >
                <span class="fontSize13 text-xs-right">{{ item.P11 }}</span>
              </v-chip>
            </td>

            <!-- { text: "จำนวน ติดกาว"} -->
            <td
              align="center"
              justify="center"
              width="10"
              @click="goDetail(item)"
            >
              <v-chip
                dark
                v-bind:class="{
                  green: item.P12 > 0,
                  white: item.P12 <= 0,
                }"
              >
                <span class="fontSize13 text-xs-right">{{ item.P12 }}</span>
              </v-chip>
            </td>

            <!-- { text: "จำนวน ลงยาสี"} -->
            <td
              align="center"
              justify="center"
              width="10"
              @click="goDetail(item)"
            >
              <v-chip
                dark
                v-bind:class="{
                  green: item.P13 > 0,
                  white: item.P13 <= 0,
                }"
              >
                <span class="fontSize13 text-xs-right">{{ item.P13 }}</span>
              </v-chip>
            </td>

            <!-- { text: "จำนวน มัดมุก"} -->
            <td
              align="center"
              justify="center"
              width="10"
              @click="goDetail(item)"
            >
              <v-chip
                dark
                v-bind:class="{
                  green: item.P14 > 0,
                  white: item.P14 <= 0,
                }"
              >
                <span class="fontSize13 text-xs-right">{{ item.P14 }}</span>
              </v-chip>
            </td>

            <!-- { text: "จำนวน QC สำเร็จ"} -->
            <td
              align="center"
              justify="center"
              width="10"
              @click="goDetail(item)"
            >
              <v-chip
                dark
                v-bind:class="{
                  green: item.P15 > 0,
                  white: item.P15 <= 0,
                }"
              >
                <span class="fontSize13 text-xs-right">{{ item.P15 }}</span>
              </v-chip>
            </td>

            <!-- จำนวน QA  -->
            <td @click="goDetail(item)" align="center" justify="center">
              <v-chip
                v-bind:class="{
                  blue: item.TotalQa > 0,
                  white: item.TotalQa <= 0,
                }"
                dark
              >
                <span class="fontSize13"
                  >{{ item.TotalQa.toLocaleString() }} ({{
                    item.perQa.toFixed(0)
                  }}%)
                </span>
              </v-chip>
            </td>

            <td @click="goDetail(item)" align="center" justify="center">
              <v-chip
                dark
                v-bind:class="{
                  green: item.dateLate > 5,
                  orange: item.dateLate <= 5 && item.dateLate >= 0,
                  pink: item.dateLate < 0,
                }"
              >
                <span class="fontSize13">
                  {{ item.dateLate }}
                </span>
              </v-chip>
            </td>
            <td align="center" justify="center">
              <v-btn
                dark
                small
                width="100"
                v-bind:class="{
                  'green lighten-2': item.Status === 'ปกติ',
                  'light-blue lighten-2': item.Status === 'ดีมาก',
                  'amber lighten-2': item.Status === 'เร่งการผลิต',
                  'red lighten-3': item.Status === 'เลยกำหนดส่ง',
                }"
              >
                <!-- <v-icon class="ml-n1" v-if="item.Status === 'ปกติ'"
                  >mdi-camera-timer</v-icon
                >
                <v-icon class="ml-n1" v-if="item.Status === 'ดีมาก'">
                  thumb_up_off_alt
                </v-icon>
                <v-icon class="ml-n1" v-if="item.Status === 'เร่งการผลิต'"
                  >mdi-alarm</v-icon
                >
                <v-icon class="ml-n1" v-if="item.Status === 'เลยกำหนดส่ง'"
                  >mdi-calendar-remove</v-icon
                > -->
                <span class="fontSize10">{{ item.Status }}</span>
              </v-btn>
            </td>
          </tr>
        </template>
      </v-data-table>

      <!-- Popupปฎิทิน -->
      <v-dialog
        v-model="dataFilter.showDatePicker"
        max-height="300"
        max-width="300"
        class="fontSarabun"
      >
        <v-date-picker
          label="วันที่กำหนดส่ง"
          v-model="dataFilter.valuesFilterDueDate"
          range
          @change="filterAll()"
          color="green"
        ></v-date-picker>
      </v-dialog>
    </v-card>
  </v-container>
</template>

<script>
import apiOrder from "../../services/apiOrderStatus";
import StockCard from "../../components/card/StockCard.vue";
import Doughnut from "../../components/charts/Doughnut.vue";
import LineChart from "../../components/charts/LineChart.vue";
import randomColor from "randomcolor";
import apiMpp from "../../services/apiMpp";
import api from "../../services/api";

const options = {
  legend: {
    display: false,
  },
  responsive: true,
  maintainAspectRatio: false,
  animation: {
    animateRotate: false,
  },
};

let dataDoughnut1 = {
  labels: ["งานทั้ง FAC", "กำลังผลิต", "ส่ง QA"],
  datasets: [
    {
      backgroundColor: ["#7267CB", "#98BAE7", "#B8E4F0"],
      data: [1, 2, 3],
    },
  ],
};

let dataDoughnut2 = {
  labels: ["เทียน", "หล่อ", "PMG", "แต่ง", "Supนอก", "ฝัง", "ขัด", "ชุบ"],
  datasets: [
    {
      backgroundColor: [
        "#F05454",
        "#FF6464",
        "#FEE440",
        "#FFEEAD",
        "#DB6400",
        "#FEA82F",
        "#FF0075",
        "#FFA6D5",
      ],
      data: [1, 2, 3],
    },
  ],
};

let dataLineChart = {
  labels: [],
  datasets: [
    {
      label: "",
      data: [],
      pointBackgroundColor: "white",
      pointBorderColor: "#A52A2A",
      backgroundColor: "rgba(82, 244, 187, 0.5)",
      borderColor: ["#8A2BE2"],
    },
  ],
};

export default {
  name: "MPP_OrderStatus",
  data() {
    return {
      isShowChart: false,
      headers: [
        {
          text: "Sales",
          value: "SalesManager",
          align: "center",
          justify: "center",
        },
        { text: "ชื่อOrder", value: "OrderNumber" },
        {
          text: "กำหนดส่ง",
          value: "DueDate",
          align: "center",
          justify: "center",
        },
        {
          text: "จำนวนทั้งOrder",
          value: "TotalQty",
          align: "center",
          justify: "center",
        },
        { text: "เทียน", value: "P4", align: "center", justify: "center" },
        { text: "หล่อ", value: "P5", align: "center", justify: "center" },
        { text: "แต่ง", value: "P8", align: "center", justify: "center" },
        { text: "Supนอก", value: "P7", align: "center", justify: "center" },
        { text: "PMG", value: "P6", align: "center", justify: "center" },
        { text: "ฝัง", value: "P9", align: "center", justify: "center" },
        { text: "ขัด", value: "P10", align: "center", justify: "center" },
        { text: "ชุบ", value: "P11", align: "center", justify: "center" },
        { text: "ติดกาว", value: "P12", align: "center", justify: "center" },
        { text: "ลงยาสี", value: "P13", align: "center", justify: "center" },
        { text: "มัดมุก", value: "P14", align: "center", justify: "center" },
        { text: "QCสำเร็จ", value: "P15", align: "center", justify: "center" },
        { text: "ส่งQA", value: "TotalQa", align: "center", justify: "center" },
        {
          text: "เหลือวันผลิต",
          value: "dateLate",
          align: "center",
          justify: "center",
        },
        {
          text: "สถานการณ์",
          value: "Status",
          align: "center",
          justify: "center",
        },
      ],
      // search: "",
      options,
      orderStatus: [],
      orderStatus2: [],
      dataDoughnut1,
      dataDoughnut2,
      dataLineChart,
      dataFilter: {
        valuesFilterDueDate: [],
        valuesShowFilterDuedate: "",
        showDatePicker: false,
        dataStatusFilter: [
          {
            statusName: "เลยกำหนดส่ง",
          },
          {
            statusName: "เร่งการผลิต",
          },
          {
            statusName: "ดีมาก",
          },
          {
            statusName: "ปกติ",
          },
        ],
        valuesFilterStatus: [],
        dataSalesFilter: [
          {
            SalesManager: "K.KLAR",
          },
          {
            SalesManager: "K.NAN",
          },
          {
            SalesManager: "K.NOOT",
          },
        ],
        valuesFilterSales: [],
        search: "",
      },
      dataChart: {
        doughnut1: {
          TotalQty: 0,
          TotalQA: 0,
        },
        doughnut2: {
          totalWax: 0,
          totalCasting: 0,
          totalPMG: 0,
          totalSup: 0,
          totalFiling: 0,
          totalSetting: 0,
          totalPoslishing: 0,
          totalPlating: 0,
        },
      },
      windowHeight: window.innerHeight,
      windowWidth: window.innerWidth,
    };
  },
  components: {
    StockCard,
    Doughnut,
    LineChart,
  },
  async mounted() {
    this.$store.state.loadingPage = true;
    // console.log(this.dataLineChart);
    // // console.log(this.dataDoughnut1);
    // // console.log('สูง', this.windowHeight);
    // // console.log('กว้าง', this.windowWidth);
    // await this.checkinRoute();
    if (this.$store.state.mppPage.dataFilterMaster) {
      this.dataFilter = this.$store.state.mppPage.dataFilterMaster;
      await this.filterAll();
    } else {
      this.dataFilter.valuesShowFilterDuedate = "2022-01-20 ~ 2025-12-31";
      this.dataFilter.valuesFilterDueDate[0] = "2022-01-20";
      this.dataFilter.valuesFilterDueDate[1] = "2022-12-31";
      await this.loadData(
        this.dataFilter.valuesFilterDueDate[1],
        this.dataFilter.valuesFilterDueDate[0]
      );
    }
    this.$emit("isCheckLogin", !(await api.isLoggedIn()));
    setTimeout(() => {
      this.$store.state.loadingPage = false;
    }, 500);

    // console.log(this.$store.state.Factory)
  },
  methods: {
    async checkinRoute() {
      // console.log('params',this.$route.path);
      const result = await apiMpp.CheckinProgram(
        this.$store.state.username,
        this.$route.path
      );
    },
    async loadData(maxDate, minDate) {
      this.isShowChart = false;
      const data = {
        maxDate: maxDate,
        minDate: minDate,
      };
      const result = await apiOrder.getOrderStatus(data);
      this.orderStatus = result;
      this.orderStatus2 = result;
      // console.log(result);
      // console.log(this.$store.getters.Factory);
      if (
        this.$store.getters.Factory !== "0" &&
        this.$store.getters.Factory !== "" &&
        this.$store.getters.Factory !== "W" &&
        this.$store.getters.Factory !== "2" &&
        this.$store.getters.Factory !== "3"
      ) {
        this.orderStatus = this.orderStatus.filter(
          (obj) => obj.ProductionTeam === this.$store.getters.Factory
        );
      } else if (
        this.$store.getters.Factory === "2" ||
        this.$store.getters.Factory === "3"
      ) {
        this.orderStatus = this.orderStatus.filter(
          (obj) => obj.ProductionTeam === "2" || obj.ProductionTeam === "3"
        );
      } else if (this.$store.getters.Factory === "") {
        this.orderStatus = [];
      }
      await this.loadDataLineChart();
      this.sumValuesChart();
      // console.log(sumTotalQty);
      setTimeout(() => {
        this.isShowChart = true;
      }, 500);
    },
    async loadDataLineChart() {
      const res = await apiOrder.getDataLineChartQA(
        this.$store.getters.Factory
      );
      // console.log(res);
      this.dataLineChart = {
        labels: res.GroupDay,
        datasets: [
          {
            label: "",
            data: res.TotalQty,
            pointBackgroundColor: "white",
            pointBorderColor: "#A52A2A",
            backgroundColor: "rgba(82, 244, 187, 0.5)",
            borderColor: ["#8A2BE2"],
          },
        ],
      };
    },
    async goDetail(item) {
      await this.$store.dispatch({
        type: "SendDataOrderStatus",
        data: item,
      });
      this.$store.state.mppPage.mppSelectOrderToDetail = item;
      this.$store.state.mppPage.dataFilterMaster = this.dataFilter;
      await this.$router.push({ path: "/mpp-menuPage" });
    },
    async filterAll() {
      // console.log(this.isShowChart);
      this.isShowChart = false;
      // console.log(this.dataFilter.valuesFilterDueDate);
      if (this.dataFilter.valuesFilterDueDate.length === 2) {
        this.dataFilter.valuesShowFilterDuedate = `${this.dataFilter.valuesFilterDueDate[0]} ~ ${this.dataFilter.valuesFilterDueDate[1]}`;
        this.dataFilter.showDatePicker = false;
        //หาค่ามากกว่าตอนกดเลือกวันที่ เวลาพนักงานกดสลับ
        let data = {
          maxDate: null,
          minDate: null,
        };
        if (
          this.dataFilter.valuesFilterDueDate[1] >
          this.dataFilter.valuesFilterDueDate[0]
        ) {
          // console.log("มากกว่า");
          data.maxDate = this.dataFilter.valuesFilterDueDate[1];
          data.minDate = this.dataFilter.valuesFilterDueDate[0];
        } else {
          // console.log("น้อยกว่า");
          data.minDate = this.dataFilter.valuesFilterDueDate[1];
          data.maxDate = this.dataFilter.valuesFilterDueDate[0];
        }
        await this.loadData(data.maxDate, data.minDate);
      }
      if (this.dataFilter.valuesFilterStatus.length > 0) {
        this.filterStatus();
      }
      if (this.dataFilter.valuesFilterSales.length > 0) {
        this.filterSales();
      }
      this.sumValuesChart();
      this.isShowChart = true;
    },
    sumValuesChart() {
      //โดนัท1
      this.dataChart.doughnut1.TotalQty = this.orderStatus.reduce(
        (pv, cv) => pv + cv.TotalQty,
        0
      );
      this.dataChart.doughnut1.TotalQA = this.orderStatus.reduce(
        (pv, cv) => pv + cv.TotalQa,
        0
      );
      this.dataDoughnut1 = {
        labels: [
          // "งานทั้ง FAC",
          "กำลังผลิต",
          "ส่ง QA",
        ],
        datasets: [
          {
            backgroundColor: ["#7267CB", "#98BAE7", "#B8E4F0"],
            data: [
              // this.dataChart.doughnut1.TotalQty,
              this.dataChart.doughnut1.TotalQty -
                this.dataChart.doughnut1.TotalQA,
              this.dataChart.doughnut1.TotalQA,
            ],
          },
        ],
      };

      //โดนัท2
      this.dataChart.doughnut2.totalWax = this.orderStatus.reduce(
        (pv, cv) => pv + cv.P4,
        0
      );
      this.dataChart.doughnut2.totalCasting = this.orderStatus.reduce(
        (pv, cv) => pv + cv.P5,
        0
      );
      this.dataChart.doughnut2.totalPMG = this.orderStatus.reduce(
        (pv, cv) => pv + cv.P6,
        0
      );
      this.dataChart.doughnut2.totalSup = this.orderStatus.reduce(
        (pv, cv) => pv + cv.P7,
        0
      );
      this.dataChart.doughnut2.totalFiling = this.orderStatus.reduce(
        (pv, cv) => pv + cv.P8,
        0
      );
      this.dataChart.doughnut2.totalSetting = this.orderStatus.reduce(
        (pv, cv) => pv + cv.P9,
        0
      );
      this.dataChart.doughnut2.totalPoslishing = this.orderStatus.reduce(
        (pv, cv) => pv + cv.P10,
        0
      );
      this.dataChart.doughnut2.totalPlating = this.orderStatus.reduce(
        (pv, cv) => pv + cv.P11,
        0
      );
      this.dataDoughnut2 = {
        labels: ["เทียน", "หล่อ", "PMG", "แต่ง", "Supนอก", "ฝัง", "ขัด", "ชุบ"],
        datasets: [
          {
            backgroundColor: [
              "#F05454",
              "#FF6464",
              "#FEE440",
              "#FFEEAD",
              "#DB6400",
              "#FEA82F",
              "#FF0075",
              "#FFA6D5",
            ],
            data: [
              this.dataChart.doughnut2.totalWax,
              this.dataChart.doughnut2.totalCasting,
              this.dataChart.doughnut2.totalPMG,
              this.dataChart.doughnut2.totalFiling,
              this.dataChart.doughnut2.totalSup,
              this.dataChart.doughnut2.totalSetting,
              this.dataChart.doughnut2.totalPoslishing,
              this.dataChart.doughnut2.totalPlating,
            ],
          },
        ],
      };
    },
    filterStatus() {
      if (this.dataFilter.valuesFilterStatus.length > 0) {
        this.orderStatus = this.orderStatus.filter((obj) =>
          this.dataFilter.valuesFilterStatus.includes(obj.Status)
        );
      }
    },
    filterSales() {
      if (this.dataFilter.valuesFilterSales.length > 0) {
        this.orderStatus = this.orderStatus.filter((obj) =>
          this.dataFilter.valuesFilterSales.includes(obj.SalesManager)
        );
      }
    },
    async clearFilter() {
      this.dataFilter.valuesShowFilterDuedate = "2022-01-20 ~ 2025-12-31";
      this.dataFilter.valuesFilterDueDate[0] = "2022-01-20";
      this.dataFilter.valuesFilterDueDate[1] = "2022-12-31";
      await this.loadData(
        this.dataFilter.valuesFilterDueDate[1],
        this.dataFilter.valuesFilterDueDate[0]
      );
      this.dataFilter.valuesFilterSales = [];
      this.dataFilter.valuesFilterStatus = [];
      this.dataFilter.search = "";
    },
  },
};
</script>

<style scope>
.mytable table tr {
  background-color: rgb(255, 255, 255);
}

.bgColor {
  background-color: rgb(74, 165, 89);
}

.myMppOrderStatus table th {
  font-size: 12px !important;
  text-align: center;
  background-color: rgb(190, 233, 213);
}

.verticalCenter {
  vertical-align: middle;
}

.bgTester {
  background-color: rgb(51, 15, 255);
}
</style>
