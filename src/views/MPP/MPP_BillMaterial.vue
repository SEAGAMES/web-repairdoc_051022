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
          <v-data-table
            :headers="headers"
            :items="dataBill"
            :search="search"
            :items-per-page="30"
            class="bgColorHeader"
          >
            <template v-slot:top>
              <v-row>
                <v-col cols="3">
                  <v-text-field
                    append-icon="search"
                    v-model="search"
                    label="ค้นหาบิล"
                    outlined
                    dense
                    class="ml-2"
                  ></v-text-field>
                </v-col>
              </v-row>
            </template>
            <template v-slot:item="{ item }">
              <tr
                v-bind:class="{
                  bgForSuccess: +item.BillStatus === 1,
                }"
              >
                <!-- เลขที่บิล -->
                <td align="center" @click="gotoDetailBill(item)">
                  {{ item.Bill_ID }}
                </td>
                <!-- เลขที่เอกสาร -->
                <td align="center" @click="gotoDetailBill(item)">
                  {{ item.BillNumber }}
                </td>
                <!-- วันที่สร้างบิล -->
                <td align="center" @click="gotoDetailBill(item)">
                  {{ convertDate(item.BillDate) }} <br /><span
                    class="grey--text"
                    >( เวลา : {{ item.BillTime }} น.)</span
                  >
                </td>
                <!-- ผู้สร้างบิล -->
                <td align="center" @click="gotoDetailBill(item)">
                  {{ item.EmpFullName }}
                </td>
                <!-- OrderNumber -->
                <td align="center" @click="gotoDetailBill(item)">
                  {{ item.OrderNumber }}
                </td>
                <!-- Fac Team -->
                <td align="center" @click="gotoDetailBill(item)">
                  {{ item.FactoryTeam }}
                </td>
                <!-- สถานะ -->
                <td align="center" @click="gotoDetailBill(item)">
                  <v-btn
                    readonly
                    small
                    width="100"
                    dark
                    v-bind:class="{
                      'color: blue lighten-1': +item.BillStatus === 3,
                      'color: indigo lighten-1': +item.BillStatus === 2,
                      'color: cyan lighten-1': +item.BillStatus === 1,
                      'color: blue-grey lighten-1':
                        item.BillStatus.trim() === '',
                    }"
                  >
                    <span class="fontSize12" v-if="+item.BillStatus === 3">
                      รับแล้ว
                    </span>
                    <span class="fontSize12" v-if="+item.BillStatus === 2">
                      รอผลิตรับ
                      <!-- เดิมพิมพ์เอกสารแล้ว -->
                    </span>
                    <span class="fontSize12" v-if="+item.BillStatus === 1">
                      รอผลิตรับ
                      <!-- เดิม รอพิมพ์เอกสาร -->
                    </span>
                    <span
                      class="fontSize12"
                      v-if="item.BillStatus.trim() === ''"
                    >
                      ยังไม่ได้ยืนยันบิล
                    </span>
                  </v-btn>
                </td>
                <!-- icon printer -->
                <td align="center">
                  <v-icon color="#7C83FD" @click="printByObj(item)"
                    >mdi-printer</v-icon
                  >
                </td>
              </tr>
            </template>
          </v-data-table>
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
      search: "",
      headers: [
        {
          text: "เลขที่บิล",
          value: "Bill_ID",
          sortable: false,
          align: "center",
          class: "bgColorHeader fontSize14",
        },
        {
          text: "เลขที่เอกสาร",
          value: "BillNumber",
          align: "center",
          class: "bgColorHeader fontSize14",
        },
        {
          text: "วันที่สร้างบิล",
          value: "BillDate",
          align: "center",
          class: "bgColorHeader fontSize14",
        },
        {
          text: "ผู้สร้างบิล",
          value: "EmpFullName",
          align: "center",
          class: "bgColorHeader fontSize14",
        },
        {
          text: "OrderNumber",
          value: "OrderNumber",
          align: "center",
          class: "bgColorHeader fontSize14",
        },
        {
          text: "Fac Team",
          value: "FactoryTeam",
          align: "center",
          class: "bgColorHeader fontSize14",
        },
        {
          text: "สถานะ",
          value: "Status",
          align: "center",
          class: "bgColorHeader fontSize14",
        },
        {
          text: "พิมพ์เอกสาร",
          value: "Print",
          align: "center",
          class: "bgColorHeader fontSize10",
        },
      ],
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
      const result = await apiMpp.CheckinProgram(
        this.$store.state.username,
        this.$route.path
      );
    },
    async loadDataBill() {
      const result = await apiMpp.getBillMaterails(
        this.orderNumber,
        this.$store.getters.Factory
      );
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
  font-size: 16px !important;
  text-align: center;
}

.bgForPrint {
  background-color: rgb(150, 186, 255);
}

.bgForSuccess {
  background-color: rgb(125, 237, 255);
}
</style>
