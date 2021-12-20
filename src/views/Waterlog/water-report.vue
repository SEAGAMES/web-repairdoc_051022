<template>
  <v-container grid-list-xs>
    <!-- loading -->
    <v-row v-if="!showPage" class="mt-16">
      <v-spacer></v-spacer>
      <PulseLoader
        justify="center"
        align="center"
        :loading="spinner"
        class="mt-16"
        v-if="!showPage"
      />
      <v-spacer></v-spacer>
    </v-row>
    <!-- Header -->
    <v-row v-if="showPage">
      <v-col>
        <v-card
          height="50px"
          color="yellow lighten-4"
          class="justify-center d-flex align-center"
        >
          <div
            align="center"
            style="font-family: Prompt; color: darkblue; font-size: 22px"
          >
            ข้อมูลการใช้น้ำ :
            <span class="purple--text">{{ todayDate | moment("LLLL") }}</span>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <!-- CHARTOFDAY -->
    <v-card  class="mt-5">
    <v-row  v-if="showPage">
      <!-- RIGHT DATA CHART-->
      <v-col cols="12">
        <v-card>

          <v-row class="ml-2 mr-2">
            <v-col cols="3">
              <v-text-field
                label="Date"
                type="date"
                outlined
                v-model="dateFilter"
              ></v-text-field>
            </v-col>

            <v-col cols="3" class="mt-2">
              <v-btn color="#d2f5ce" @click="changeDate()">เปลี่ยน</v-btn>
            </v-col>

          </v-row>

          <BarChartWater
            :chartData="datacollectionDay"
            style="height: 300px"
            class="fontPrompt"
          />
        </v-card>
      </v-col>
    </v-row>
    </v-card>

    <!-- DATA -->
    <v-card  v-for="(item, index) in dataMeter" :key="index" class="mt-5">
    <v-row  v-if="showPage">
      <!-- LEFT DATA -->
      <v-col cols="3">
        <v-card height="300px" color="rgba(190, 234, 237, 0.5) " class="mt-3">
          <!-- Header -->
          <v-row>
            <v-col cols="5">
              <v-btn
                color="blue lighten-2"
                dark
                class="ml-2 mt-2"
                @click="onClickShowPopup(index, item.deviceCode)"
                >Meter No. {{ index + 1 }}</v-btn
              >
            </v-col>
            <v-col cols="7">
              <div class="mt-2 fontSize18">
                <b>ตำแหน่ง :</b>
                <span class="fontSize22 grey--text ml-2">{{ item.position }}</span>
              </div>
            </v-col>
          </v-row>
          <v-divider class="mt-2"></v-divider>
          <br />
          <!-- แสดงปริมาณต่อวัน -->
          <v-row>
            <v-col cols="12">
              <div class="ml-2 fontSize18">
                <b>ปริมาณการใช้น้ำวันนี้ :</b>
                <span class="fontSize22 blue--text ml-2 mr-2">{{ item.TotalDay.toLocaleString() }}</span> ลิตร.
                <span class="fontSize22 blue--text">({{ (item.TotalDay / 1000) }} Q)</span>
              </div>
            </v-col>
          </v-row>
          <br />

          <br />
          <!-- แสดงปริมาณต่อเดือน -->
          <v-row>
            <v-col cols="12">
              <div class="ml-2 fontSize18">
                <b>ปริมาณการใช้เดือนนี้ :</b>
                <span class="fontSize22 blue--text ml-1 mr-1">{{ item.TotalMonth.toLocaleString() }}</span> ลิตร.
                <span class="fontSize22 blue--text">({{ (item.TotalMonth / 1000) }} Q)</span>
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <!-- RIGHT DATA CHART-->
      <v-col cols="9">
        <v-card>
          <BarChartWater
            :chartData="datacollectionArray[index]"
            style="height: 300px"
            class="fontPrompt"
          />
        </v-card>
      </v-col>
    </v-row>
    </v-card>

    <!-- PopUp -->
    <v-dialog v-model="dialogShow" max-height="600" max-width="600">
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          ตำแหน่ง : {{ dialogData.deviceCode }}
        </v-card-title>

        <v-card-text>
          <v-img :src="dialogData.dataPict" width="500"></v-img>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialogShow = false">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import BarChartWater from "../../components/charts/BarChartWaterlog.vue";
import apiWater from "../../services/apiWater";
import PulseLoader from "../../components/Loadings/PulseLoader.vue";
import moment from "moment";

export default {
  name: "water-report",
  data() {
    return {
      spinner: true,
      todayDate: "",
      showPage: false,
      MonthChartReport: {
        DayShow: [],
        v01: [],
        v02: [],
        v03: [],
        v04: [],
        v05: [],
        v06: [],
        v07: [],
        v08: [],
        v09: [],
        v10: [],
        v11: [],
        v12: [],
        v13: [],
        v14: [],
        v15: [],
      },
      datacollectionArray: [],
      dataChartMonth: [],
      dialogData: {
        deviceCode: "WT-01",
        dataPict: "",
      },
      dialogShow: false,
      dataMeter: [],
      chartOfDay: {
        dataChartOfDay: [],
        lableDeviceName: [],
        datacollectionDay: {},
      },
      colorChartWeekend: [],
      dateFilter: null,
    };
  },
  async mounted() {
    this.dateFilter = new Date();
    await this.loadColorWeekend();
    moment.locale("th");
    this.todayDate = new Date();
    await this.loadDataWaterMeter();
    await this.loadDataChartMonth();

  },
  components: {
    BarChartWater,
    PulseLoader,
  },
  methods: {
    async loadDataChartMonth() {
      this.spinner = true;
      const result = await apiWater.getWaterReportMONTH();
      result.forEach((data, index) => {
        this.MonthChartReport.DayShow.push(data.dayNum);
        this.MonthChartReport.v01.push(data.v01);
        this.MonthChartReport.v02.push(data.v02);
        this.MonthChartReport.v03.push(data.v03);
        this.MonthChartReport.v04.push(data.v04);
        this.MonthChartReport.v05.push(data.v05);
        this.MonthChartReport.v06.push(data.v06);
        this.MonthChartReport.v07.push(data.v07);
        this.MonthChartReport.v08.push(data.v08);
        this.MonthChartReport.v09.push(data.v09);
        this.MonthChartReport.v10.push(data.v10);
        this.MonthChartReport.v11.push(data.v11);
        this.MonthChartReport.v12.push(data.v12);
        this.MonthChartReport.v13.push(data.v13);
        this.MonthChartReport.v14.push(data.v14);
        this.MonthChartReport.v15.push(data.v15);
      });
      this.dataChartMonth.push(this.MonthChartReport.v01);
      this.dataChartMonth.push(this.MonthChartReport.v02);
      this.dataChartMonth.push(this.MonthChartReport.v03);
      this.dataChartMonth.push(this.MonthChartReport.v04);
      this.dataChartMonth.push(this.MonthChartReport.v05);
      this.dataChartMonth.push(this.MonthChartReport.v06);
      this.dataChartMonth.push(this.MonthChartReport.v07);
      this.dataChartMonth.push(this.MonthChartReport.v08);
      this.dataChartMonth.push(this.MonthChartReport.v09);
      this.dataChartMonth.push(this.MonthChartReport.v10);
      this.dataChartMonth.push(this.MonthChartReport.v11);
      this.dataChartMonth.push(this.MonthChartReport.v12);
      this.dataChartMonth.push(this.MonthChartReport.v13);
      this.dataChartMonth.push(this.MonthChartReport.v14);
      this.dataChartMonth.push(this.MonthChartReport.v15);
      // console.log('data', this.MonthChartReport)
      // console.log(this.dataChartMonth);
      await this.fillData();
    },
    async fillData() {
      try {
        for (let index = 0; index < 15; index++) {
          // console.log(index);
          this.datacollectionArray.push({
            labels: this.MonthChartReport.DayShow,
            datasets: [
              {
                label: `WT-0${index + 1}`,
                pointBackgroundColor: "white",
                borderWidth: 1,
                pointBorderColor: "#A52A2A",
                data: this.dataChartMonth[index],
                borderColor: "#ADD8E6",
                borderWidth: 2,
                backgroundColor: this.colorChartWeekend,
              },
            ],
          });
          await this.$store.dispatch({
            type: "SetDataWaterLogChart",
            data: this.datacollectionArray,
          });
          // console.log(this.$store.state.waterlog.chartData);
        }
      } catch (error) {
        console.log("นี้คือ Error Try", error);
      } finally {
        setTimeout(() => {
          this.spinner = false;
          this.showPage = true;
        }, 500);
      }
    
    },
    async loadDataWaterMeter() {
      this.chartOfDay.dataChartOfDay = [];
      this.chartOfDay.lableDeviceName = [];
      try {
        const result = await apiWater.getWaterLogOfDay()
        this.dataMeter = result;
        // console.log(this.dataMeter)
        //Loop ทำ Chart ของรายวัน
        result.forEach((data, index) => {
          this.chartOfDay.dataChartOfDay.push(data.TotalDay);
          this.chartOfDay.lableDeviceName.push(data.deviceCode);
        })
      } catch (error) {
        console.log(error);
      } finally {
        // console.log(this.chartOfDay.lableDeviceName);
        this.datacollectionDay = {
            labels: this.chartOfDay.lableDeviceName,
            datasets: [
              {
                label: `สรุปรายวัน`,
                pointBackgroundColor: "#FCE4EC",
                borderWidth: 1,
                pointBorderColor: "#A52A2A",
                data: this.chartOfDay.dataChartOfDay,
                borderColor: ["#F06292"],
                borderWidth: 2,
                backgroundColor: this.colorChartWeekend,
              },
            ],
          }
      }

    },
    onClickShowPopup(index, deviceCode) {
      const updatePict = `http://192.168.3.5:3000/picture/PICTURE/meter/M${index + 1 }.jpg`;
      this.dialogData.dataPict = updatePict;
      this.dialogData.deviceCode = deviceCode;
      this.dialogShow = true;
      // console.log(dataPict)
    },
    async loadColorWeekend() {
      const response = await apiWater.getColorWeekend();
      this.colorChartWeekend = response;
      // console.log('CSS', response);
    },
    async changeDate() {
      const date = {
        dateParse: this.dateFilter
      }
      const response = await apiWater.changeDateFilter(date);
        if(response.message == 'ok') {
          this.showPage = false;
          this.spinner = true;
          this.chartOfDay.dataChartOfDay = [];
          this.chartOfDay.lableDeviceName = [];
        //Loop ทำ Chart ของรายวัน
        // console.log(response.result)
        response.result.forEach((data, index) => {
          this.chartOfDay.dataChartOfDay.push(data.TotalDay);
          this.chartOfDay.lableDeviceName.push(data.deviceCode);
        });
        // console.log(this.chartOfDay.lableDeviceName);
        // console.log(this.colorChartWeekend)
        this.datacollectionDay = {
            labels: this.chartOfDay.lableDeviceName,
            datasets: [
              {
                label: `สรุปรายวัน`,
                pointBackgroundColor: "#FCE4EC",
                borderWidth: 1,
                pointBorderColor: "#A52A2A",
                data: this.chartOfDay.dataChartOfDay,
                borderColor: ["#F06292"],
                borderWidth: 2,
                backgroundColor: ["#FFCDD2",
                                  "#FFE0B2",
                                  "#F8BBD0",
                                  "#EA80FC",
                                  "#B0BEC5",
                                  "#D1C4E9",
                                  "#B388FF",
                                  "#F0F4C3",
                                  "#FFF9C4",
                                  "#E1BEE7",
                                  "#84FFFF",
                                  "#80CBC4",
                                  "#D7CCC8",
                                  "#FFF176"
                                  ],
              },
            ],
          }
          this.todayDate = this.dateFilter;
        setTimeout(() => {
          this.spinner = false;
          this.showPage = true;
        }, 500);
        } else {
          alert('ข้อมูลผิดพลาด')
        }
      
    }
  },
};
</script>

<style>
</style>