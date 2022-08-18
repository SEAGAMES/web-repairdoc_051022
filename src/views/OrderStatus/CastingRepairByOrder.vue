<template>
  <v-container grid-list-xs v-if="!$store.state.loadingPage">
    <v-card>
      <v-data-table
        :search="search"
        :headers="headers"
        :items="dataTable"
        :items-per-page="15"
        class="tableCasting"
      >
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-text-field
              v-model="search"
              append-icon="search"
              label="ค้นหา Order"
              single-line
              hide-details
              outlined
              dense
              class="mr-1"
              color="blue"
            >
            </v-text-field>
            <v-spacer></v-spacer>
            <v-text-field
              label="ค้นหาจากวันที่"
              :value="valuesFilter.betweenDate.showdate"
              outlined
              hide-details
              color="blue"
              readonly
              append-icon="mdi-calendar-month"
              dense
              class="mr-1"
              @click="valuesFilter.betweenDate.showpopup = true"
            />
            <v-spacer></v-spacer>
            <v-select
              label="ค้นหาจากสถานะ"
              :items="valuesFilter.statusFilter.showStatus"
              v-model="valuesFilter.statusFilter.selecteds"
              color="blue"
              outlined
              dense
              hide-details
              append-icon="mdi-format-line-spacing"
              multiple
              clearable
              class="mr-1"
              @change="filterAll()"
            />
            <v-spacer></v-spacer>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-btn color="blue" dark @click="printCastingByOrder()"
              ><v-icon>mdi-printer</v-icon></v-btn
            >
          </v-toolbar>
          <v-row>
            <v-spacer></v-spacer>
            <div class="fontSize12 mr-5 mt-5 mb-5 grey--text">
              * จำนวนหล่ออื่นๆ คือ จำนวนหล่อประเภท หล่องานอะไหล่, หล่อตัวอย่าง,
              หล่อ Wax *
            </div>
          </v-row>
        </template>

        <template v-slot:item="{ item }">
          <tr class="fontSarabun">
            <td width="250" align="start" @click="gotoDetail(item)">
              <div>{{ item.OrderNumber }}</div>
              <span class="grey--text fontSize12"
                >Factory : {{ item.ProductionTeam }}</span
              >
            </td>
            <td width="150" align="center" @click="gotoDetail(item)">
              <span class="grey--text fontSize12">({{ item.thaiDate }}) </span>
              <span>{{ convertDate(item.OrderDate) }}</span>
            </td>
            <td width="100" align="center" @click="gotoDetail(item)">
              {{ item.JobQty.toLocaleString() }}
            </td>
            <td width="120" align="center" @click="gotoDetail(item)">
              <v-chip
                v-bind:class="{
                  'amber lighten-2': item.TotalBillRepairCasting > 0,
                  'white grey--text ': item.TotalBillRepairCasting <= 0,
                }"
                ><div>
                  {{ item.TotalBillRepairCasting.toLocaleString() }}
                </div></v-chip
              >
            </td>
            <!-- จำนวนที่รับคืนจากบิลหล่อซ่อม -->
            <td width="120" align="center" @click="gotoDetail(item)">
              <v-chip
                dark
                v-bind:class="{
                  'red lighten-2':
                    item.TotalReturnRepairCasting <
                      item.TotalBillRepairCasting &&
                    item.TotalBillRepairCasting !== 0,
                  'blue lighten-2':
                    item.TotalReturnRepairCasting >=
                      item.TotalBillRepairCasting &&
                    item.TotalReturnRepairCasting !== 0,
                  'white grey--text ': item.TotalBillRepairCasting <= 0,
                }"
                ><div>
                  {{ item.TotalReturnRepairCasting.toLocaleString() }}
                </div></v-chip
              >
            </td>
            <td
              width="100"
              align="center"
              @click="gotoDetail(item)"
              :class="item.TotalCastingNormal <= 0 ? 'grey--text' : ''"
            >
              {{ item.TotalCastingNormal.toLocaleString() }}
            </td>
            <td
              width="100"
              align="center"
              @click="gotoDetail(item)"
              :class="item.TotalCastingSample <= 0 ? 'grey--text' : ''"
            >
              {{ item.TotalCastingSample.toLocaleString() }}
            </td>
            <td width="120" align="center" @click="gotoDetail(item)">
              <v-chip
                v-bind:class="{
                  white:
                    item.TotalBillRepairCasting -
                      item.TotalReturnRepairCasting <=
                    0,
                  'red lighten-2':
                    item.TotalBillRepairCasting -
                      item.TotalReturnRepairCasting >
                    0,
                }"
                dark
                >{{
                  (
                    item.TotalBillRepairCasting - item.TotalReturnRepairCasting
                  ).toLocaleString()
                }}</v-chip
              >
            </td>
            <td width="110" align="center">
              <v-btn
                v-bind:class="{
                  'white black--text': item.Status === 'ไม่มีหล่อซ่อม',
                  'red lighten-2': item.Status === 'ยังรับกลับไม่ครบ',
                  'blue lighten-2': item.Status === 'รับกลับครบแล้ว',
                }"
                dark
                width="100"
                small
              >
                <div class="fontSize12">
                  {{ item.Status }}
                </div>
              </v-btn>
            </td>
          </tr>
        </template>
      </v-data-table>
      <!-- Popupปฎิทิน -->
      <v-dialog
        v-model="valuesFilter.betweenDate.showpopup"
        max-height="300"
        max-width="300"
        class="fontSarabun"
      >
        <v-date-picker
          label="วันที่แจ้งซ่อม"
          v-model="valuesFilter.betweenDate.valuesDate"
          range
          @change="filterAll()"
          color="blue"
        ></v-date-picker>
      </v-dialog>
    </v-card>
  </v-container>
</template>

<script>
import apiOrder from "../../services/apiOrderStatus.js";
import apiCreatePDF from "../../services/apiCreatePDF";
// import moment from "moment";

export default {
  name: "casting-repair-byorder",
  data() {
    return {
      search: "",
      headers: [
        {
          text: "OrderNumber",
          value: "OrderNumber",
          align: "center",
        },
        { text: "วันที่สร้างOrder", value: "OrderDate", align: "center" },
        { text: "จำนวนสั่งผลิตทั้งหมด", value: "JobQty", align: "center" },
        {
          text: "จำนวนขอหล่อซ่อม",
          value: "TotalBillRepairCasting",
          align: "center",
        },
        {
          text: "จำนวนที่รับคืนจากบิลหล่อซ่อม",
          value: "TotalReturnRepairCasting",
          align: "center",
        },
        { text: "จำนวนที่หล่อ", value: "TotalCastingNormal", align: "center" },
        {
          text: "จำนวนหล่ออื่นๆ",
          value: "TotalCastingSample",
          align: "center",
        },
        { text: "DIFF", sortable: false, align: "center" },
        { text: "สถานะ", value: "Status", align: "center" },
      ],
      dataTable: [],
      dataTable2: [],
      valuesFilter: {
        statusFilter: {
          showStatus: [],
          selecteds: [],
        },
        betweenDate: {
          minDate: "",
          maxDate: "",
          showpopup: false,
          valuesDate: [],
          showdate: "2022-01-01 ~ 2025-12-31",
        },
      },
    };
  },
  async mounted() {
    this.$store.state.loadingPage = true;
    this.valuesFilter.betweenDate.minDate = "2022-01-01";
    this.valuesFilter.betweenDate.maxDate = "2025-12-31";
    this.showdate = `${this.valuesFilter.betweenDate.minDate} ~ ${this.valuesFilter.betweenDate.maxDate}`;
    await this.loadData();
    setTimeout(() => {
      this.$store.state.loadingPage = false;
    }, 200);
  },
  methods: {
    async loadData() {
      //to do
      const { res, filterStatus } = await apiOrder.castingRepairByOrder(
        this.valuesFilter.betweenDate
      );
      this.dataTable = res;
      this.dataTable2 = res;
      this.valuesFilter.statusFilter.showStatus = filterStatus;
      // console.log(res);
    },
    convertDate(date) {
      // moment().locale("th");
      const dateParse = new Date(date);
      // this.date = moment().add(543, ‘year’).format(‘LLLL’)
      return `${this.$moment(dateParse).add(543, "year").format("L")}`;
    },
    async filterAll() {
      if (this.valuesFilter.betweenDate.valuesDate.length === 2) {
        await this.filterDate();
      } else {
        this.dataTable = this.dataTable2;
      }
      if (this.valuesFilter.statusFilter.selecteds.length > 0) {
        this.filterStatus();
      }
    },
    filterStatus() {
      this.dataTable = this.dataTable.filter((obj) =>
        this.valuesFilter.statusFilter.selecteds.includes(obj.Status)
      );
    },
    async filterDate() {
      // console.log(this.valuesFilter.betweenDate.valuesDate);
      if (
        this.valuesFilter.betweenDate.valuesDate[1] >
        this.valuesFilter.betweenDate.valuesDate[0]
      ) {
        // console.log("มากกว่า");
        this.valuesFilter.betweenDate.maxDate =
          this.valuesFilter.betweenDate.valuesDate[1];
        this.valuesFilter.betweenDate.minDate =
          this.valuesFilter.betweenDate.valuesDate[0];
      } else {
        // console.log("น้อยกว่า");
        this.valuesFilter.betweenDate.minDate =
          this.valuesFilter.betweenDate.valuesDate[1];
        this.valuesFilter.betweenDate.maxDate =
          this.valuesFilter.betweenDate.valuesDate[0];
      }
      this.valuesFilter.betweenDate.showdate = `${this.valuesFilter.betweenDate.minDate} ~ ${this.valuesFilter.betweenDate.maxDate}`;
      const result = await apiOrder.castingRepairByOrder(
        this.valuesFilter.betweenDate
      );
      this.dataTable = result;
      this.dataTable2 = result;
      this.valuesFilter.betweenDate.showpopup = false;
    },
    filterSearch() {
      //หาเฉพาะคำที่พิมพ์ลงในช่อง search
      this.dataTable = this.dataTable.filter(
        (obj) => obj.OrderNumber.search(this.search.toUpperCase()) >= 0
      );
    },
    async gotoDetail(item) {
      this.$store.state.castingPage.values_gotoDetail = item;
      await this.$router.push(`/casting-repair-byitem/${item.ProductionTeam}`);
    },
    async printCastingByOrder() {
      if (this.search.length > 0) {
        this.filterSearch();
        await apiCreatePDF.printCastingByOrder(this.dataTable);
      } else {
        await apiCreatePDF.printCastingByOrder(this.dataTable);
      }
    },
  },
};
</script>

<style>
.tableCasting table th {
  font-size: 14px !important;
  font-weight: bold;
  text-align: center;
  text-justify: center;
  vertical-align: center;
  background-color: #bbdefb;
}
</style>