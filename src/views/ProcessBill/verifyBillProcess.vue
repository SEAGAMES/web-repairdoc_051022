<template>
  <v-card>
    <div align="right" class="mr-2">
      <v-img :src="barCodeShow" width="120" />
    </div>

    <v-row>
      <v-col>
        <b class="fontSize16">ผู้ทำรายการบิล :</b>
        {{ $store.state.fullName }} ({{ $store.state.username }})</v-col
      >
      <v-col>
        <b class="fontSize16">โอนจากแผนก :</b>
        {{
          this.$store.state.processBill.processBillCreate.step1
            .selectedProcessName
        }}</v-col
      >
    </v-row>
    <v-row>
      <v-col>
        <b class="fontSize16">วันที่ :</b> {{ convertDate(BillDate) }} เวลา :
        {{ $moment(BillDate).format("LTS") }}
      </v-col>
      <v-col>
        <b class="fontSize16">ไปแผนก :</b>
        {{
          this.$store.state.processBill.processBillCreate.step3
            .selectedProcessName
        }}</v-col
      >
    </v-row>
    <v-row>
      <v-col> <b class="fontSize16">เลขที่บิล :</b> {{ DocNumber }} </v-col>
      <v-col>
        <b class="fontSize16">OrderNumber :</b>
        {{
          $store.state.processBill.processBillCreate.step2.orderNumber
        }}</v-col
      >
    </v-row>
    <v-row>
      <v-col> </v-col>
      <v-col>
        <b>ผู้รับ :</b> _________________
        <b>วันที่รับ :</b> _________________</v-col
      >
    </v-row>
    <v-row>
      <v-col>
        <v-simple-table class="border" width="1500">
          <template v-slot:default>
            <thead>
              <tr align="center" justify="center" class="yellow">
                <th class="text-center" width="100">
                  <div class="fontSize14"><b>รายการที่</b></div>
                </th>
                <th class="text-center">
                  <div class="fontSize14"><b>รายการสินค้า</b></div>
                </th>
                <th class="text-center" width="100">
                  <div class="fontSize14"><b>จำนวนที่ส่ง</b></div>
                </th>
                <th class="text-center" width="100">
                  <div class="fontSize14"><b>น้ำหนักที่ส่ง</b></div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                align="center"
                v-for="(item, index) in dataTable"
                :key="index"
              >
                <td>
                  <div>
                    {{ index + 1 }}
                  </div>
                </td>
                <td align="center">
                  <v-img
                    :src="item.NewPict"
                    :lazy-src="$store.state.no_picture"
                    width="150"
                    class="text-left"
                  >
                    <v-chip color="blue" dark small>
                      <span class="">{{ item.OrderItemNo }}</span></v-chip
                    >
                  </v-img>
                  <div>{{ item.ProductCode }}</div>
                  <div class="grey--text">{{ item.JobNumber }}</div>
                </td>
                <td class="text-center">
                  <div>{{ item.QtySend.toLocaleString() }}</div>
                </td>
                <td class="text-center">
                  <div>{{ item.WeightSend.toLocaleString() }} g.</div>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>

    <v-row>
      <v-col align="center"> <v-btn color="white" light>ยกเลิก</v-btn> </v-col>
      <v-col align="center">
        <v-btn color="success" @click="submit()">ยืนยันบิล</v-btn></v-col
      >
    </v-row>
  </v-card>
</template>

<script>
import apiCreatePDF from "../../services/apiCreatePDF";
import apiProcess from "../../services/apiProcess";
export default {
  name: "verifyBillProcess",
  props: ["propsValuesCart"],
  data() {
    return {
      dataTable: this.propsValuesCart,
      dataCartInsert: [],
      BillDate: new Date(),
      barCodeShow: "",
      dialogSuccess: {},
      DocNumber: `P${this.$moment(new Date()).format("YY")}${this.$moment(
        new Date()
      ).format("MM")}XXXX`,
    };
  },
  async mounted() {
    this.propsValuesCart.forEach((item, index) => {
      this.dataCartInsert.push({
        itemNo: index + 1,
        JobNumber: item.JobNumber.trim(),
        QtySend: item.QtySend,
        WeightSend: item.WeightSend,
      });
    });
    this.barCodeShow = apiCreatePDF.textToBase64Barcode(this.DocNumber);
  },
  methods: {
    async submit() {
      const dataCreate = {
        orderNumber:
          this.$store.state.processBill.processBillCreate.step2.orderNumber.trim(),
        fromProcess:
          this.$store.state.processBill.processBillCreate.step1.selectedProcess.trim(),
        toProcess:
          this.$store.state.processBill.processBillCreate.step3.selectedProcess.trim(),
        billDate: this.BillDate,
        DocMaker: this.$store.state.username.trim(),
        productBill: {
          create: this.dataCartInsert,
        },
      };
      const result = await apiProcess.insertBill(dataCreate);
      // console.log(result);
      if (result.apiResult) {
        this.$emit("insertSucess", {
          resultInsert: result.saveData,
          toProcess: dataCreate.toProcess,
        });
      }
    },
    convertDate(date) {
      this.$moment().locale("th");
      // const dateParse = new Date(date);
      // console.log(this.$moment(date).format("LTS"));
      return `${this.$moment(date).add(543, "year").format("L")}`;
    },
  },
};
</script>

<style>
</style>