<template>
  <v-container grid-list-xs>
    
    <!-- loading -->
    <v-row v-if="spinner" class="mt-16">
      <v-spacer></v-spacer>
      <PulseLoader
        justify="center"
        align="center"
        :loading="spinner"
        class="mt-16"
      />
      <v-spacer></v-spacer>
    </v-row>

    <!-- DATA -->
    <v-row class="ma-3" v-if="!spinner">
      <v-col
        lg="3"
        md="6"
        sm="12"
        v-for="(item, index) in dataMeter"
        :key="index"
      >
        <!-- <v-card color="light-blue lighten-5" class="pt-2 pb-2"> -->
          <v-card class="pt-2 pb-2">
          <!-- <v-card  v-bind:class="{cardOnline : CheckDate(item.LastCheckDevice), 'grey': !CheckDate(item.LastCheckDevice) }" class="pt-2 pb-2"> -->
         
          <div class="text-center" align="center">
            <span style="font-family: Prompt; color: black; font-size: 20px">
              {{ item.deviceCode }}
            </span>
          </div>

          <!-- class="color: grey and myImg"> v-bind:class="{ active: isActive, 'text-danger': hasError }" -->

          <div
            align="center"
            v-bind:class="{ myImg: !CheckDate(item.LastCheckDevice) }"
          >
            <v-icon color="green" size="100" class="mt-3">mdi-gauge</v-icon>

            <div
              class="mt-2"
              style="color: green; font-size: 16px"
              v-if="CheckDate(item.LastCheckDevice)"
            >
              On-Line
            </div>
            <div
              class="mt-2"
              style="color: green; font-size: 16px"
              v-if="!CheckDate(item.LastCheckDevice)"
            >
              Off-Line
            </div>

            <div class="mt-2" style="color: black; font-size: 12px" @click="ClickTest(item.LastCheckDevice)">
              ล่าสุด : {{ DateShow(item.LastCheckDevice) }}
            </div>
          </div>

          <div align="center" class="mt-2">
            ตำแหน่ง : {{ item.position }}
            <br />
            <a
              ><span
                class="grey--text fontSize12"
                @click="onclickmore(item, index)"
                >Showmore...</span
              ></a
            >
          </div>

          <div class="mt-2 ml-3 mr-3" v-if="item.ifShowmore">
            <v-text-field
              label="ตำแหน่ง"
              outlined
              type="text"
              :disabled="!item.ifRevised"
              v-model="item.formUpdate.position"
            />

            <v-text-field
              class="mt-n4"
              label="ตัวคูณ"
              outlined
              type="number"
              :disabled="!item.ifRevised"
              v-model="item.formUpdate.exrate"
            />

            <v-text-field
              class="mt-n4"
              label="กำหนดค่า Limit"
              outlined
              type="number"
              :disabled="!item.ifRevised"
              v-model="item.formUpdate.rateLimit"
            />

            <div v-if="!item.ifRevised" align="right" justify="center">
              <v-btn @click="item.ifRevised = true">แก้ไข</v-btn>
            </div>

            <div align="center" justify="center" v-if="item.ifRevised">
              <v-btn
                color="green"
                dark
                class="ml-2"
                @click="conClickSubmit(item.deviceCode, item.formUpdate)"
                >ยืนยันแก้ไข</v-btn
              >
              <v-btn
                color="grey"
                @click="onClickCancel(item, index)"
                dark
                class="ml-6"
                >ยกเลิก</v-btn
              >
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
import apiWater from "../../services/apiWater";
import PulseLoader from "../../components/Loadings/PulseLoader.vue";
import moment from "moment";

export default {
  name: "water-meter",
  data() {
    return {
      spinner: null,
      showPage: false,
      //   ifShowmore: false,
      //   ifRevised: false,
      dataMeter: [],
    };
  },
  async mounted() {
    await this.loadDataMeter();
    // await this.checkStatusDevice();
    // test
    // console.log(this.CheckDate());
  },
  methods: {
    onclickmore(data, index) {
      this.dataMeter[index].ifShowmore = !this.dataMeter[index].ifShowmore;
      // console.log(this.dataMeter[index]);
    },
    onClickCancel(data, index) {
      this.dataMeter[index].ifRevised = false;
      this.dataMeter[index].formUpdate = {
        position: data.position,
        exrate: data.exrate,
        rateLimit: data.rateLimit,
      };
      // console.log('data', data)
      // console.log('change', this.dataMeter[index].formUpdate)
    },
    async loadDataMeter() {
      this.spinner = true;
      try {
        const result = await apiWater.getWaterLogOfDay();
        // console.log(result);
        this.dataMeter = result;
        // this.dataMeter.forEach((data, index) => {
        //   this.dataMeter[index].formUpdate = {
        //     position: data.position,
        //     exrate: data.exrate,
        //     rateLimit: data.rateLimit,
        //   };
        // });
      } catch (error) {
        console.log(error);
      } finally {
        setTimeout(() => {
          this.spinner = false;
          this.showPage = true;
          // console.log(this.dayOfYear(this.dataMeter[0].Lastcount))
          // console.log(this.dataMeter);
        }, 500);
      }
    },
    async conClickSubmit(deviceCode, data) {
      const formUpdate = {
        position: data.position,
        exrate: +data.exrate,
        rateLimit: +data.rateLimit,
      };
      // console.log(formUpdate);
      if (formUpdate.exrate >= 1 || formUpdate.rateLimit >= 1) {
        //Popupยืนยัน
        const isConfirm = window.confirm("แน่ใจนะว่าต้องการแก้ไขข้อมูลนี้");
        if (isConfirm) {
          try {
            const result = await apiWater.updatewaterLimit(deviceCode, data);
            // console.log(result)
            if (result.message == "ok") {
              await this.$swal({
                title: "Modify Success",
                icon: "success",
                text: "Your work has been saved",
                // showConfirmButton: true,
                timer: 1500,
              });
              this.$router.go(0);
            }
          } catch (error) {
            console.log(error);
          }
        }
      }
    },
    async checkStatusDevice() {
      // const result = await apiWater.checkStatusDevice();
      // console.log(result)
    },
    DateShow(date) {
      if (date !== null && date !== undefined) {
        const dateParse = new Date(Date.parse(date));
        moment.locale("th");
        // let aa = moment().add(543, "year").format("LLLL")
        return moment.utc(dateParse).subtract(0, "days").calendar();
        // return `${moment.utc(dateParse).add(543, "year").format("L")} (${moment.utc(dateParse).add(543, "year").format("LT")} น.)`
        // const dateConvert = new Date(dateParse.toUTCString());
        // // console.log(dateConvert);
        // console.log(dateParse.toUTCString())
        // // console.log('state2', moment(result[0].JobDate).tz("Atlantic/Azores").format('HH:MM'))
        // // console.log('state3', result[0].JobDate.toTimeString())
        // console.log('state2', moment.utc(dateParse).format('HH:MM'))
      }
    },
    ClickTest(date) {
        moment.locale("th");
        const dateparse = new Date(Date.parse(date));
        const dateparse2 = new Date((dateparse - (7*60*60*1000)));
        const check = new Date((new Date())- 10000 * 60)
          console.log(dateparse2)
          console.log(check)
          if(dateparse2 > check ) {
            // console.log('กว่าจะได้')
          }
    },
    CheckDate(date) {
      // console.log(date)
      if (date !== null && date !== undefined) {
        const dateparse = new Date(Date.parse(date));
        const dateparse2 = new Date((dateparse - (7*60*60*1000)));
        const check = new Date((new Date())- 30000 * 60)
          // console.log(dateparse2)
          // console.log(check)
          if(dateparse2 > check ) {
            return true
            // console.log('กว่าจะได้')
          } else {
            return false
          }

        //** เก่า *** 
        // const dateparse = new Date(Date.parse(date));
        // const dateNow = new Date();
        // // console.log('วัน UTC', dateparse.toUTCString())
        // // console.log('วัน ปัจจุบัน', dateparse.toDateString())
        // // console.log('นาทีUTC', dateparse.getUTCMinutes())
        // // console.log('นาทีปัจจุบัน', dateNow.getUTCMinutes())
        // if (
        //   dateparse.toDateString() == dateNow.toDateString() && // วันที่เท่ากัน
        //   dateparse.getUTCHours() >= dateNow.getHours() &&  //ชมปัจจุบัน. เท่ากับ ชม.ที่ส่งมา
        //   dateNow.getUTCMinutes() - dateparse.getUTCMinutes() <= 30 //นาทีปัจจุบัน ลบนาทีที่ส่งมา แล้วน้อยกว่า 30 นาที
        // ) {
        //   // console.log('ปัจจุบัน - 30นาที', check.toUTCString());
        //   // console.log('ค่าที่ส่ง ', dateparse.toUTCString())
        //   // var aMinuteAgo = new Date( dateparse.getUTC - 1000 * 60 );
        //   // console.log(dateNow.getUTCMinutes() * 60 )
        //   return true;
        // } else {
        //   return false;
        // }
      }
    },
  },
  components: {
    PulseLoader,
  },
};
</script>

<style >
.cardOnline {
  color: #24323b;
}
</style>