<template>
  <v-container grid-list-xs class="fontPrompt">
    <v-card >
    <template>
        <v-row>
            <v-col>
              <v-text-field
              v-model="search"
              append-icon="search"
              label="Search"
              single-line
              hide-details
              outlined
              @change="loadData()"
            ></v-text-field>
            </v-col>
        </v-row>

        
    </template>

    <template>
      <v-row class="border mr-5 ml-5 mt-6">
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
                    v-for="item in mouldBill"
                    :key="item.ID"
                    align="center"
                    justify="center"
                    @click="goDetail(item)"
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

    <v-row>
        
            <v-spacer></v-spacer>
            <v-btn color="red" dark class="mr-10 mt-2" @click="$router.back()">กลับ</v-btn>
     
    </v-row>


    </v-card>
  </v-container>
</template>

<script>
import apiMould from "../../services/apiMould";
import MouldModify from "../Mould/MouldModify";
export default {
  name: "mould-history",
  components: {
    MouldModify,
  },
  data() {
    return {
      error: [],
      search: "",
      mouldBill: [],
      headers: [
        { text: "เลขที่บิล", value: "DocID", align: "center", justify: "center"},
        { text: "วันที่ยืม", value: "BillDate", align: "center", justify: "center"},
        { text: "ผู้ขอยืม", value: "OwnerFullName", align: "center", justify: "center" },
        { text: "แผนก", value: "DepartName", align: "center", justify: "center" },
        { text: "ชื่อ Order", value: "OrderNumber", align: "center", justify: "center"},
        { text: "รหัสแม่พิมพ์", value: "ModelNo", align: "center", justify: "center" },
        { text: "ประเภทการยืม", value: "JobTypeName", align: "center", justify: "center" },
        { text: "เหลือวันคืน", value: "LateDate", align: "center", justify: "center" },
        { text: "สถานะ", value: "Status", align: "center", justify: "center" },
        { text: "Action", value: "", align: "center", justify: "center" },
      ],
    };
  },
  async mounted() {
   
  },
  methods: {
    async loadData() {
      console.log(this.search)
      const result = await apiMould.getMouldBillFindOne(this.search);
      console.log(result)
      this.mouldBill = result;
    },
 
    async goDetail(item) {
      await this.$store.dispatch({
        type: "setDataMouldDetail",
        data: item,
      });
      await this.$router.push("/mould-detail");
    },
  },
};
</script>

<style>
.fontSize10 {
  font-size: 10px;
}

.fontSize14 {
  font-size: 14px;
}

.tableMould table th {
  font-size: 14px !important;
  text-align: center;
  background-color: rgb(255, 249, 213);
}
</style>