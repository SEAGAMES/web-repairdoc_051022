<template>
  <v-container grid-list-xs>
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

    <v-row v-if="!spinner">
      <v-col class="mt-5" align="center">
        <div class="fontSize28">
          <b>
            แสดงรายการบิลทั้งหมด
            <!-- <span class="fontSize28">{{ this.orderNumber }}</span> -->
          </b>
        </div>
      </v-col>
    </v-row>

    <v-row v-if="!spinner">
      <v-col>
        <v-card class="fontSarabun">
          <v-simple-table class="border">
            <template v-slot:default>
              <thead>
                <tr align="center" justify="center" class="bgColorHeader">
                  <th width="10">
                    <v-checkbox v-model="checkboxHeader" color="#88FFF7" />
                  </th>
                  <th class="text-center">
                    <div class="fontSize14">
                      <b> เลขที่บิล </b>
                    </div>
                  </th>

                  <th class="text-center">
                    <div class="fontSize14">
                      <b> เลขที่เอกสาร </b>
                    </div>
                  </th>
                  <th class="text-center">
                    <div class="fontSize14">
                      <b> วันที่สร้างบิล </b>
                    </div>
                  </th>
                  <th class="text-center">
                    <div class="fontSize14">
                      <b> ผู้สร้างบิล </b>
                    </div>
                  </th>

                  <th class="text-center" >
                    <div class="fontSize14">
                      <b> OrderNumber </b>
                    </div>
                  </th>

                  <th class="text-center" width="30">
                    <div class="fontSize14">
                      <b> Fac_Team </b>
                    </div>
                  </th>
                  <th class="text-center" width="30">
                    <div class="fontSize14">
                      <b> สถานะ </b>
                    </div>
                  </th>
                  <th class="text-center" width="30">
                    <div class="fontSizes14">
                      <b> พิมพ์เอกสาร </b>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="bill in dataBill"
                  :key="bill.Bill_ID"
                  align="center"
                  v-bind:class="{
                    bgForSuccess: +bill.BillStatus === 1,
                  }"
                >
                  <td width="10">
                    <v-checkbox
                      v-model="bill.checkbox"
                      :value="true"
                      color="#7C83FD"
                    />
                  </td>
                  <!-- เลขที่บิล -->
                  <td @click="gotoDetailBill(bill)">
                    <div>
                      {{ bill.Bill_ID }}
                    </div>
                  </td>

                  <!-- เลขที่เอกสาร -->
                  <td @click="gotoDetailBill(bill)">
                    <div>
                      {{ bill.BillNumber }}
                    </div>
                  </td>

                  <!-- วันที่สร้างบิล -->
                  <td @click="gotoDetailBill(bill)">
                    <div>
                      {{ convertDate(bill.BillDate) }} <br /><span
                        class="grey--text"
                        >( เวลา : {{ bill.BillTime }} น.)</span
                      >
                    </div>
                  </td>

                  <!-- รหัสพนักงาน -->
                  <td @click="gotoDetailBill(bill)" align="start">
                    <div>
                      {{ bill.EmpFullName }}
                    </div>
                  </td>

                   <!-- FacTeam -->
                  <td @click="gotoDetailBill(bill)" align="start">
                    <div >
                      {{ bill.OrderNumber }}
                    </div>
                  </td>

                  <!-- FacTeam -->
                  <td @click="gotoDetailBill(bill)">
                    <div>
                      {{ bill.FactoryTeam }}
                    </div>
                  </td>

                  <!-- FacTeam -->
                  <td @click="gotoDetailBill(bill)">
                    <v-btn
                      readonly
                      small
                      width="100"
                      dark
                      v-bind:class="{
                        'color: blue lighten-1': +bill.BillStatus === 3,
                        'color: indigo lighten-1': +bill.BillStatus === 2,
                        'color: cyan lighten-1': +bill.BillStatus === 1,
                        'color: blue-grey lighten-1':
                          bill.BillStatus.trim() === '',
                      }"
                    >
                      <span class="fontSize12" v-if="+bill.BillStatus === 3">
                        รับแล้ว
                      </span>
                      <span class="fontSize12" v-if="+bill.BillStatus === 2">
                        รอผลิตรับ 
                        <!-- เดิมพิมพ์เอกสารแล้ว -->
                      </span>
                      <span class="fontSize12" v-if="+bill.BillStatus === 1">
                        รอผลิตรับ
                         <!-- เดิม รอพิมพ์เอกสาร -->
                      </span>
                      <span
                        class="fontSize12"
                        v-if="bill.BillStatus.trim() === ''"
                      >
                        ยังไม่ได้ยืนยันบิล
                      </span>
                    </v-btn>
                    <div></div>
                  </td>

                  <td>
                    <v-icon color="#7C83FD" @click="printByObj(bill)"
                      >mdi-printer</v-icon
                    >
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-if="!spinner">
      <v-col align="end" class="ma-5">
        <v-btn
          color="red"
          dark
          @click="
            $router.back(), ($store.state.mppPage.mppBillIDForPrint = null)
          "
          >กลับ</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import apiMpp from "../../services/apiMpp";
import moment from "moment";
import PulseLoader from "../../components/Loadings/PulseLoader.vue";
import apiCreatePDF from "../../services/apiCreatePDF";

export default {
  name: "MPP_BillMaterails",
  data() {
    return {
      spinner: true,
      dataBill: [],
      orderNumber: "",
      checkboxHeader: false,
    };
  },
  components: {
    PulseLoader,
  },
  async mounted() {
    // await this.checkinRoute();
    // this.orderNumber =
    //   this.$store.state.mppPage.mppSelectOrderToDetail.OrderNumber;
    await this.loadDataBill();
    // this.spinner = false;
    setTimeout(async () => {
      this.spinner = false;
      // if (
      //   this.orderNumber === "" ||
      //   this.orderNumber === undefined ||
      //   this.orderNumber === null
      // ) {
      //   await this.$router.push("/mpp-orderStatus").catch(() => {});
      // }
    }, 500);
  },
  methods: {
    async checkinRoute() {
      // console.log('params',this.$route.path);
      const result = await apiMpp.CheckinProgram(this.$store.state.username, this.$route.path);
    },
    async loadDataBill() {
      const result = await apiMpp.getBillMaterails(this.orderNumber, this.$store.getters.Factory);
      this.dataBill = result;
      //   console.log(result);
    },
    convertDate(date) {
      moment.locale("th");
      const dateParse = new Date(date);
      return `${moment(dateParse).add(543, "year").format("L")}`;
    },
    async gotoDetailBill(obj) {
      this.$store.state.mppPage.mppBillIDForPrint = obj.Bill_ID;
      await this.$router.push("/mpp-receivebill");
    },
    async printByObj(obj) {
      const result = await apiMpp.getBillForReceive(
        this.orderNumber,
        +obj.Bill_ID,
        this.$store.getters.Factory
      );
      // console.log(obj);
      await apiCreatePDF.printBillMaterial(result);
      // this.dataBill.forEach((data, index) => {
      //     if(data.checkbox) {
      //         console.log(index);
      //     }
      // })
    },
  },
};
</script>

<style scope>
.bgColorHeader {
  background-color: rgb(124, 131, 253);
}

.bgForPrint {
  background-color: rgb(150, 186, 255);
}

.bgForSuccess {
  background-color: rgb(125, 237, 255);
}
</style>