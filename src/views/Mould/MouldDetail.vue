<template>
  <v-container grid-list-xs class="fontPrompt">
    <template>
      <v-row class="border ma-5">
        <v-col lg="4" md="4" sm="4">
          <h3 >
            ผู้ทำเอกสารขอยืม:
            <u class="pl-2">{{
              $store.getters.dataMouldDetail.OwnerFullName
            }}</u>
          </h3>
          <h3>
            แผนกผู้ยืม:
            <u class="pl-16">{{
              $store.getters.dataMouldDetail.DepartName
            }}</u>
          </h3>
          <h3>
            วันที่ทำเอกสาร :
            <u class="pl-6">({{ $store.getters.dataMouldDetail.dowBillDate }}) 
              {{$store.getters.dataMouldDetail.BillDate | moment("DD/MM/YYYY")}}</u>
          </h3>
          <h3>
            เลขที่เอกสาร :
            <u class="pl-10">{{ $store.getters.dataMouldDetail.DocID }}</u>
          </h3>
          <h3>
            วันที่กำหนดคืน :
            <u class="pl-6"> ({{$store.getters.dataMouldDetail.dowDueDate}}) {{
              $store.getters.dataMouldDetail.DueDate | moment("DD/MM/YYYY")
            }}</u>
          </h3>
           <h3>
            หมายเหตุ :
            <u class="pl-16"> {{ $store.getters.dataMouldDetail.remark }}</u>
          </h3>
          
          <br />
          <h3>
            ชื่อผู้ยืม-รับแม่พิมพ์ :
            <u class="pl-8">{{
              $store.getters.dataMouldDetail.ReceiverFullName
            }}</u>
          </h3>
          <h3>
            วันที่ผู้ยืม-รับแม่พิมพ์ :
            <u class="pl-5" v-if="$store.getters.dataMouldDetail.ReceiveDate"> ({{ $store.getters.dataMouldDetail.dowReceiveDate }}) {{
              $store.getters.dataMouldDetail.ReceiveDate | moment("DD/MM/YYYY")
            }}</u>
          </h3>
        </v-col>

        <v-col lg="3" md="3" sm="3">
          <!-- <v-img :src="$store.getters.dataMouldDetail.NewPict"></v-img> -->
          <v-img :src="$store.getters.pictDetail"></v-img>
        </v-col>

        <v-col lg="5" md="5" sm="5" align="left">
          <h3 class="pl-16">
            ชื่อ Order :
            <u class="pl-16">{{
              $store.getters.dataMouldDetail.OrderNumber
            }}</u>
          </h3>
          <h3 class="pl-16">
            รหัสแม่พิมพ์ :
            <u class="pl-13">{{ $store.getters.dataMouldDetail.ModelNo }}</u>
          </h3>
          <h3 class="pl-16">
            ประเภทการยืม :
            <u class="pl-10">{{ $store.getters.dataMouldDetail.JobTypeName }}</u>
          </h3>
          <h3 class="pl-16">
            จำนวนแม่พิมพ์ :
            <u class="pl-9">{{ $store.getters.dataMouldDetail.Qty }} ชิ้น</u> 
          </h3>
          <br />

          <h3 class="pl-16">
            ผู้จัดเตรียมแม่พิมพ์ :
            <u class="pl-1">{{
              $store.getters.dataMouldDetail.PrepareFullName
            }}</u>
          </h3>
          <h3 class="pl-16">
            วันที่จัดเตรียม :
            <u class="pl-11" v-if="$store.getters.dataMouldDetail.PrepareDate">({{ $store.getters.dataMouldDetail.dowPrepareDate }}) {{
              $store.getters.dataMouldDetail.PrepareDate | moment("DD/MM/YYYY")
            }}</u>
          </h3>

          <br />
          <h3 class="pl-16">
            ผู้รับคืนแม่พิมพ์ :
            <u class="pl-8">{{
              $store.getters.dataMouldDetail.ReturnPersonFullName
            }}</u>
          </h3>
          <h3 class="pl-16">
            วันที่รับกลับ:
            <u class="pl-16" v-if="$store.getters.dataMouldDetail.ReturnDate">({{ $store.getters.dataMouldDetail.dowReturnDate }}) {{
              $store.getters.dataMouldDetail.ReturnDate | moment("DD/MM/YYYY")
            }}</u>
          </h3>
        </v-col>
      </v-row>
      <v-row class="border mr-5 ml-5 mt-n6">
        <v-col lg="12" md="12" sm="12">
          <v-row align="center" justify="center">
            <h3 class="fontPrompt20"><b>ประวัติการแก้ไขและยืมแม่พิมพ์</b></h3>
          </v-row>
        </v-col>
        <v-col lg="12" md="12" sm="12">
          <v-row align="center" justify="center">
            <v-simple-table class="border" width="1500">
              <template v-slot:default>
                <thead>
                  <tr align="center" justify="center" class="border">
                    <th class="text-center" width="80">วันที่ทำเอกสาร</th>
                    <th class="text-center" width="80">เลขที่เอกสาร</th>
                    <th class="text-center" width="200">ผู้ขอยืมแม่พิมพ์</th>
                    <th class="text-center" width="120">ประเภทการยืม</th>
                    <th class="text-center" width="300">รายละเอียดการแก้ไข</th>
                    <th class="text-center" width="80">วันที่รับกลับ</th>
                    <th class="text-center" width="200">ผู้รับกลับ</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="item in dataTable"
                    :key="item.ID"
                    align="center"
                    justify="center"
                  >
                    <td>{{ item.BillDate | moment("DD/MM/YYYY") }}</td>
                    <td>{{ item.DocID }}</td>
                    <td>{{ item.OwnerFullName }}</td>
                    <td>{{ item.JobTypeName }}</td>
                    <td>{{ item.RepairModelDesc }}</td>
                    <td>{{ item.ReturnDate | moment("DD/MM/YYYY") }}</td>
                    <td>{{ item.ReturnPersonFullName }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-row>
        </v-col>
      </v-row>
    </template>

    <v-stepper v-model="timeLine" class="mt-10">
      <v-stepper-header>
        <v-stepper-step :complete="timeLine >= 1" step="1" color="orange" complete-icon="done" >
          ส่งคำขอยืมแม่พิมพ์
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="timeLine >= 2" step="Rea" color="blue" complete-icon="done">
          แม่พิมพ์พร้อมรับ
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="timeLine >= 3" step="WIP" color="pink" complete-icon="done">
          กำลังดำเนินการ (WIP)
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="timeLine >= 4" step="OK" color="green" complete-icon="done">
          รับแม่พิมพ์คืนแล้ว
        </v-stepper-step>
      </v-stepper-header>
    </v-stepper>

    <v-row class="ma-5">
      <v-spacer></v-spacer>
      <v-btn color="error" @click="$router.back()">กลับหน้าหลัก</v-btn>
      <v-btn class="ml-5" @click="testPrint()">Print</v-btn>
    </v-row>
  </v-container>
</template>


<script>
import { htmlToPaper } from "vue-html-to-paper";

export default {
  name: "mould-detail",
  data() {
    return {
      dataHeader: {},
      dataTable: [],
      timeLine: 1,
    };
  },
  async mounted() {
    await this.loadDataHeader();
    this.checktimeLine();
    // console.log(this.$store.getters.dataMouldDetail.NewPict)
  },
  methods: {
    loadData() {},
    async loadDataHeader() {
      const data = await this.$store.getters.dataMouldDetail;
      this.dataHeader = data;
      this.dataTable = await this.$store.getters.dataMouldDetailTable;
      // console.log("dataDetail", this.dataTable);
    },
    testPrint() {
      htmlToPaper("Print");
    },
    checktimeLine() {
      if (this.$store.getters.dataMouldDetail.Status === "01") {
        this.timeLine = 1;
      } else if (this.$store.getters.dataMouldDetail.Status === "02") {
        this.timeLine = 2;
      } else if (this.$store.getters.dataMouldDetail.Status === "03") {
        this.timeLine = 3;
      } else if (this.$store.getters.dataMouldDetail.Status === "04") {
        this.timeLine = 4;
      } else if (this.$store.getters.dataMouldDetail.Status === "05") {
        this.timeLine = 3;
      }
    },
  },
};
</script>

<style>
.border {
  border-style: groove;
}
</style>